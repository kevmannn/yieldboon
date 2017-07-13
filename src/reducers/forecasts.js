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
        precipForecasts: precipForecasts(state.precipForecasts, action)
      }
    default:
      return state;
  }
}

function precipForecasts(state = [], { type, countyName, coords, series, err }) {
  switch (type) {
    case FAIL_TO_RECEIVE_FORECAST:
      return [
        ...state.filter(({ countyName: name }) => name !== countyName),
        {
          countyName,
          err,
          isFetching: false
        }
      ]
    case REQUEST_FORECAST:
      return [
        ...state,
        {
          countyName,
          isFetching: true
        }
      ]
    case RECEIVE_FORECAST:
      // Append the new forecast to the prexisting, removing any that are now stale.
      return [
        ...state.filter(({ countyName: name, lastUpdated }) => {
          return name !== countyName && Date.now() - lastUpdated < MS_IN_DAY;
        }),
        {
          countyName,
          coords,
          series,
          isFetching: false,
          lastUpdated: Date.now()
        }
      ]
    default:
      return state;
  }
}
