import moment from 'moment';
import { REHYDRATE } from 'redux-persist/constants';
// import { handle } from 'redux-pack';

import {
  END_FETCH,
  BEGIN_FETCH,
  REQUEST_FORECAST,
  RECEIVE_FORECAST,
  SET_FORECAST_FILTER,
  FAIL_TO_RECEIVE_FORECAST,
  REACH_FORECAST_REQ_LIMIT
} from '../actions';

const isForecastForToday = ({ lastUpdated }) => moment(lastUpdated).unix() > moment().startOf('day').unix();

export default (state = { blacklist: [], precipForecasts: [] }, action) => {
  const { type, blacklist = [], payload = {} } = action;
  switch (type) {
    case SET_FORECAST_FILTER:
      return {
        ...state,
        blacklist
      }
    // Remove any cached forecasts that have become stale.
    case REHYDRATE:
      return payload.forecasts
        ? {
            ...payload.forecasts,
            precipForecasts: payload.forecasts.precipForecasts.filter(isForecastForToday)
          }
        : state
    case REACH_FORECAST_REQ_LIMIT:
    case FAIL_TO_RECEIVE_FORECAST:
    case REQUEST_FORECAST:
    case RECEIVE_FORECAST:
      return {
        ...state,
        errorLog: errorLog(state.errorLog, action),
        isFetching: isFetching(state.isFetching, action),
        precipForecasts: precipForecasts(state.precipForecasts, action)
      }
    default:
      return state;
  }
}

function precipForecasts(state = [], { type, id, countyName, coords, series }) {
  switch (type) {
    case RECEIVE_FORECAST:
      return [
        ...state.filter(isForecastForToday),
        {
          countyName,
          coords,
          series,
          id,
          lastUpdated: Date.now()
        }
      ]
    default:
      return state;
  }
}

function errorLog(state = {}, { type, countyName, message }) {
  switch (type) {
    case REACH_FORECAST_REQ_LIMIT:
      return {
        ...state,
        reachedLimitAt: Date.now()
      }
    case FAIL_TO_RECEIVE_FORECAST:
      return {
        ...state,
        [countyName]: [ ...state[countyName], message ]
      }
    case RECEIVE_FORECAST:
      // If it exists, remove the key corresponding to the received countyName.
      const stateWithErroredCounties = !state[countyName]
        ? state
        : Object.keys(state)
            .filter(key => key !== countyName)
            .reduce((acc, erroredCountyName) => ({
              ...acc,
              [erroredCountyName]: state[erroredCountyName]
            }), {})
      return {
        ...stateWithErroredCounties,
        reachedLimitAt: null
      }
    default:
      return state;
  }
}

function isFetching(state = false, { type }) {
  switch (type) {
    case BEGIN_FETCH:
      return true;
    case END_FETCH:
      return false;
    default:
      return state;
  }
}
