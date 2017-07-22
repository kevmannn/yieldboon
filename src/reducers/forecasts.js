// import { handle } from 'redux-pack';
import { REHYDRATE } from 'redux-persist/constants';

import { MS_IN_DAY } from '../constants';
import {
  REQUEST_FORECAST,
  RECEIVE_FORECAST,
  SET_FORECAST_FILTER,
  FAIL_TO_RECEIVE_FORECAST
} from '../actions';

const isNonStaleForecast = ({ lastUpdated }) => Date.now() - lastUpdated < MS_IN_DAY;

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
      return {
        ...payload.forecasts,
        precipForecasts: payload.forecasts.precipForecasts.filter(isNonStaleForecast)
      }
    case FAIL_TO_RECEIVE_FORECAST:
    case REQUEST_FORECAST:
    case RECEIVE_FORECAST:
      return {
        ...state,
        isFetching: isFetching(state, action),
        errorMessage: errorMessage(state, action),
        precipForecasts: precipForecasts(state.precipForecasts, action)
      }
    default:
      return state;
  }
}

// TODO: turn state into an object which associates [stateName]: { ...forecast }
function precipForecasts(state = [], { type, id, countyName, coords, series }) {
  switch (type) {
    case RECEIVE_FORECAST:
      return [
        ...state.filter(isNonStaleForecast),
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

function errorMessage(state = null, { type, message }) {
  switch (type) {
    case FAIL_TO_RECEIVE_FORECAST:
      return message;
    case REQUEST_FORECAST:
    case RECEIVE_FORECAST:
      return null;
    default:
      return state;
  }
}

function isFetching(state = false, { type }) {
  switch (type) {
    case REQUEST_FORECAST:
      return true;
    case RECEIVE_FORECAST:
    case FAIL_TO_RECEIVE_FORECAST:
      return false;
    default:
      return state;
  }
}
