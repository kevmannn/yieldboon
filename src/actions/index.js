import fetch from 'isomorphic-fetch';
import { v4 } from 'uuid';
import moment from 'moment';
import nprogress from 'nprogress';
import capitalize from 'lodash/capitalize';

export const END_LOAD_FORECASTS = 'END_LOAD_FORECASTS';
export const BEGIN_LOAD_FORECASTS = 'BEGIN_LOAD_FORECASTS';
// export const NARROW_COUNTIES = 'NARROW_COUNTIES'
export const SELECT_STATE = 'SELECT_STATE';
export const SELECT_FACTOR = 'SELECT_FACTOR';
export const SELECT_TIME_SPAN = 'SELECT_TIME_SPAN';
export const RECEIVE_FORECAST = 'RECEIVE_FORECAST';
export const SET_FORECAST_FILTER = 'SET_FORECAST_FILTER';
export const FAIL_TO_RECEIVE_FORECAST = 'FAIL_TO_RECEIVE_FORECAST';
export const REACH_FORECAST_REQ_LIMIT = 'REACH_FORECAST_REQ_LIMIT';
export const REQUEST_CROP_YIELD = 'REQUEST_CROP_YIELD';
export const RECEIVE_CROP_YIELD = 'RECEIVE_CROP_YIELD';
export const FAIL_TO_RECEIVE_CROP_YIELD = 'FAIL_TO_RECEIVE_CROP_YIELD';

// export const narrowCounties = () => ({
//   type: NARROW_COUNTIES
// })

export const selectState = (stateName) => ({
  type: SELECT_STATE,
  stateName
})

export const selectFactor = (factorName) => ({
  type: SELECT_FACTOR,
  factorName
})

export const selectTimeSpan = (timeSpan) => ({
  type: SELECT_TIME_SPAN,
  timeSpan
})

export const setForecastFilter = ({ hiddenIds, revealedIds }) => ({
  type: SET_FORECAST_FILTER,
  hiddenIds,
  revealedIds
})

export const endLoadForecasts = () => ({
  type: END_LOAD_FORECASTS
})

export const beginLoadForecasts = () => ({
  type: BEGIN_LOAD_FORECASTS
})

const requestCropYield = () => ({
  type: REQUEST_CROP_YIELD
})

const receiveCropYield = (payload) => ({
  type: RECEIVE_CROP_YIELD,
  payload
})

const failToReceiveCropYield = () => ({
  type: FAIL_TO_RECEIVE_CROP_YIELD
})

const API_URL = 'https://yieldboon-api.now.sh';
// TODO: Generalize to support other crop types.
const fetchCropYield = () => (dispatch) => {
  dispatch(requestCropYield());
  return fetch(`${API_URL}/yield`)
    // Map the response to the values we care about and remove vaguely attributed data.
    .then(
      res => res.status >= 400
        ? dispatch(failToReceiveCropYield())
        : res.json()
    )
    .then(({ data }) => (
      data
        .map(({ Value, state_name, state_alpha, county_name, unit_desc }) => ({
          cropYield: parseFloat(Value) * 1000,
          stateName: capitalize(state_name),
          stateAbbr: state_alpha,
          countyName: capitalize(county_name),
          unit: unit_desc
        }))
        .filter(({ countyName }) => countyName !== 'Other (combined) counties')
    ))
    .then(payload => dispatch(receiveCropYield(payload)))
}

// Fetch yield data from usda.gov if inexistent or stale.
export const fetchCropYieldIfNeeded = () => (dispatch, getState) => {
  const { lastUpdated } = getState().cropYield;
  if (!lastUpdated || moment(lastUpdated).unix() < moment().startOf('year').unix()) {
    return dispatch(fetchCropYield());
  }
}

const receiveForecast = ({ countyName, stateAbbr, coords, series }) => ({
  type: RECEIVE_FORECAST,
  countyName,
  stateAbbr,
  coords,
  series,
  id: v4()
})

const failToReceiveForecast = ({ countyName, stateAbbr, message }) => ({
  type: FAIL_TO_RECEIVE_FORECAST,
  countyName,
  stateAbbr,
  message
})

const reachForecastReqLimit = ({ countyName }) => ({
  type: REACH_FORECAST_REQ_LIMIT,
  countyName
})

const fetchCoords = ({ countyName, stateAbbr }) => (dispatch) => {
  return fetch(`${API_URL}/coords?address=${countyName}+${stateAbbr}`)
    .then(
      res => res.status >= 400
        ? dispatch(failToReceiveForecast({ countyName, stateAbbr, message: 'Something went wrong.' }))
        : res.json()
    )
    .then(({ lat, lng }) => ({
      countyName,
      stateAbbr,
      coords: { lat, lng }
    }))
}

const today = moment().format('YYYY-MM-DDTHH:mm:ss');
const fetchForecast = ({ countyName, stateAbbr, coords }, time = today) => (dispatch) => {
  const { lat, lng } = coords;
  // Adding `time` to the req yields data starting at midnight of _that_ day and ending at the next midnight.
  return fetch(`${API_URL}/forecast?location=${lat}+${lng}&time=${time}`)
    .then(
      res => res.status >= 400
        ? res.status === 403
          ? dispatch(reachForecastReqLimit({ countyName }))
          : dispatch(failToReceiveForecast({ countyName, stateAbbr, message: 'Something went wrong.' }))
        : res.json()
    )
    .then(({ hourly: { data } }) => {
      // TODO: Generalize for other factor types.
      const series = data
        .map(({ time, precipIntensity: y, precipProbability: z }, i) => ({
          i,
          x: time * 1000,
          y,
          z
        }))

      dispatch(receiveForecast({ countyName, stateAbbr, coords, series }));
    })
}

// Get the forecast for a given county if it's not in the store (= inexistent or stale).
const fetchForecastIfNeeded = ({ countyName, stateAbbr }) => (dispatch, getState) => {
  const { precipForecasts } = getState().forecasts;
  if (!precipForecasts.find(({ countyName: name }) => name === countyName)) {
    return dispatch(fetchCoords({ countyName, stateAbbr }))
      .then(({ countyName, stateAbbr, coords }) => {
        if (coords.lat && coords.lng) {
          return dispatch(fetchForecast({ countyName, stateAbbr, coords }));
        }
      })
  } else {
    return Promise.resolve();
  }
}

export const loadForecasts = (payloadSubset) => (dispatch) => {
  nprogress.start();
  dispatch(beginLoadForecasts());
  Promise.all(payloadSubset.map(county => dispatch(fetchForecastIfNeeded(county))))
    .then(() => {
      dispatch(endLoadForecasts());
      nprogress.done();
    })
}
