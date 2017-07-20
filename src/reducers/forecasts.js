// import { handle } from 'redux-pack';
import { MS_IN_DAY } from '../constants';
import {
  REQUEST_FORECAST,
  RECEIVE_FORECAST,
  SET_FORECAST_FILTER,
  FAIL_TO_RECEIVE_FORECAST
} from '../actions';

export default (state = { blacklist: [], precipForecasts: [] }, action) => {
  const { type, blacklist = [] } = action;
  switch (type) {
    case SET_FORECAST_FILTER:
      return {
        ...state,
        blacklist
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

function precipForecasts(state = [], { type, id, countyName, coords, series }) {
  switch (type) {
    case REQUEST_FORECAST:
    case FAIL_TO_RECEIVE_FORECAST:
      return state;
    case RECEIVE_FORECAST:
      // Append the new forecast to the prexisting, removing any that are now stale.
      return [
        ...state.filter(({ id: identity, lastUpdated }) => {
          return identity !== id && Date.now() - lastUpdated < MS_IN_DAY;
        }),
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
