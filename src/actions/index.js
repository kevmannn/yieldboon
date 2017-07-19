import fetch from 'isomorphic-fetch';
import moment from 'moment';
import nprogress from 'nprogress';
import capitalize from 'lodash/capitalize';

import { MS_IN_DAY, USDA_URL, FORECAST_URL, FORECAST_API_KEY } from '../constants';

export const SELECT_STATE = 'SELECT_STATE';
export const REQUEST_FORECAST = 'REQUEST_FORECAST';
export const RECEIVE_FORECAST = 'RECEIVE_FORECAST';
export const SET_FORECAST_FILTER = 'SET_FORECAST_FILTER';
export const FAIL_TO_RECEIVE_FORECAST = 'FAIL_TO_RECEIVE_FORECAST';
export const REQUEST_SOYBEAN_PRODUCTION = 'REQUEST_SOYBEAN_PRODUCTION';
export const RECEIVE_SOYBEAN_PRODUCTION = 'RECEIVE_SOYBEAN_PRODUCTION';
export const CHANGE_SOYBEAN_YIELD_BOUNDS = 'CHANGE_SOYBEAN_YIELD_BOUNDS';

export const selectState = (name) => ({
  type: SELECT_STATE,
  name
})

export const setForecastFilter = (blacklist) => ({
  type: SET_FORECAST_FILTER,
  blacklist
})

const requestSoybeanProduction = () => ({
  type: REQUEST_SOYBEAN_PRODUCTION
})

const receiveSoybeanProduction = (payload) => ({
  type: RECEIVE_SOYBEAN_PRODUCTION,
  payload
})

const fetchSoybeanProduction = () => (dispatch) => {
  dispatch(requestSoybeanProduction());
  return fetch(USDA_URL)
    // Map the response to the values we care about and remove vaguely attributed data.
    .then(res => res.json())
    .then(({ data }) => (
      data
        .map(({ Value, state_name, state_alpha, county_name, unit_desc }) => ({
          soybeanYield: parseInt(Value, 10) * 1000,
          stateName: capitalize(state_name),
          stateAbbr: state_alpha,
          countyName: capitalize(county_name),
          unit: unit_desc
        }))
        .filter(({ countyName }) => countyName !== 'Other (combined) counties')
    ))
    .then(payload => dispatch(receiveSoybeanProduction(payload)))
}

// Pull soybean production data from usda.gov if inexistent or stale.
export const fetchSoybeanProductionIfNeeded = () => (dispatch, getState) => {
  const { lastUpdated } = getState().soybeanProduction;
  if (!lastUpdated || Date.now() - lastUpdated > 365 * MS_IN_DAY) {
    return dispatch(fetchSoybeanProduction());
  }
}

const requestForecast = (countyName) => ({
  type: REQUEST_FORECAST,
  countyName
})

const receiveForecast = ({ countyName, coords, series }) => ({
  type: RECEIVE_FORECAST,
  countyName,
  coords,
  series
})

const failToReceiveForecast = ({ countyName, err }) => ({
  type: FAIL_TO_RECEIVE_FORECAST,
  countyName,
  err
})

const fetchCoords = ({ countyName, stateAbbr }) => (dispatch) => {
  return fetch(`https://lat-lng.now.sh/?address=${countyName},${stateAbbr}`)
    .then(
      res => res.json(),
      err => {
        dispatch(failToReceiveForecast({ countyName, err }));
        throw err;
      }
    )
    .then(({ lat, lng }) => ({
      countyName,
      coords: { lat, lng }
    }))
}

// TODO: shouldCascadeYs implementation.
const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DDTHH:mm:ss');
const fetchForecast = ({ countyName, coords }, time = yesterday, shouldCascadeYs = false) => (dispatch) => {
  const { lat, lng } = coords;
  dispatch(requestForecast(countyName));
  // Adding `time` to the req yields data starting at midnight of _that_ day and ending at the next midnight.
  return fetch(`${FORECAST_URL}/${FORECAST_API_KEY}/${lat},${lng},${time}`)
    .then(
      res => res.json(),
      err => {
        dispatch(failToReceiveForecast({ countyName, err }));
        throw err;
      }
    )
    .then(({ hourly: { data } }) => {
      // Mapreduce the response to form a series with y values expressing the accumulated precipIntensity
      // (where precipIntensity = "inches of liquid water per hour").
      const series = data
        .map(({ time, precipIntensity: y, precipProbability: z }, i) => ({
          i,
          x: time * 1000,
          y,
          z
        }))
        .reduce((acc, { i, x, y, z }) => ([
          ...acc,
          {
            i,
            x,
            y: i > 0 ? y + acc[i - 1].y : y,
            z
          }
        ]), [])

      dispatch(receiveForecast({ countyName, coords, series }));
    })
}

// Find coordinates and the forecast for a given county if inexistent (or not up to date).
// TODO: does this still work with the new reducer composition?
// TODO: https://github.com/lelandrichardson/redux-pack (?)
const fetchForecastIfNeeded = ({ countyName, stateAbbr }, time) => (dispatch, getState) => {
  const { precipForecasts } = getState().forecasts;
  if (!precipForecasts.find(({ countyName: name }) => name === countyName)) {
    return dispatch(fetchCoords({ countyName, stateAbbr }))
      .then(({ countyName, coords }) => {
        return dispatch(fetchForecast({ countyName, coords }, time));
      })
  } else {
    return Promise.resolve();
  }
}

// TODO: Account for week-long forecast histories.
export const loadForecasts = (activePayloads) => (dispatch) => {
  nprogress.start();
  dispatch(fetchForecastIfNeeded(activePayloads[0]))
    .then(() => nprogress.done())
}
