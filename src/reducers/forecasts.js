import moment from 'moment';
import { REHYDRATE } from 'redux-persist/constants';
// import { handle } from 'redux-pack';

import {
  REQUEST_FORECAST,
  RECEIVE_FORECAST,
  SET_FORECAST_FILTER,
  FAIL_TO_RECEIVE_FORECAST
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
    case FAIL_TO_RECEIVE_FORECAST:
    case REQUEST_FORECAST:
    case RECEIVE_FORECAST:
      return {
        ...state,
        isFetching: isFetching(state.isFetching, action),
        errorMessage: errorMessage(state.errorMessage, action),
        precipForecasts: precipForecasts(state.precipForecasts, action)
      }
    default:
      return state;
  }
}

// TODO: Turn state into an object which associates { [stateName]: [ ...forecasts ] }.
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

function errorMessage(state = null, { type, message }) {
  switch (type) {
    // TODO: Turn state into an object which associates { [countyName]: [ ...errorMessages ] }.
    // case RECEIVE_FORECAST:
    //   return {
    //     ...state,
    //     [countyName]: [ ...state[countyName], message ]
    //   }
    case FAIL_TO_RECEIVE_FORECAST:
      return message;
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
