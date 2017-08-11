import moment from 'moment';
// import { handle } from 'redux-pack';
// import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';

import {
  REQUEST_FORECAST,
  RECEIVE_FORECAST,
  END_LOAD_FORECASTS,
  BEGIN_LOAD_FORECASTS,
  SET_FORECAST_FILTER,
  FAIL_TO_RECEIVE_FORECAST,
  REACH_FORECAST_REQ_LIMIT
} from '../actions';

const isForecastForToday = ({ lastUpdated }) => moment(lastUpdated).unix() > moment().startOf('day').unix();

export default (state = { disallowedIds: [], precipForecasts: [] }, action) => {
  const { type, hiddenIds = [], revealedIds = [], payload = {} } = action;
  switch (type) {
    case SET_FORECAST_FILTER:
      return {
        ...state,
        disallowedIds: [
          ...(state.disallowedIds || []),
          ...hiddenIds
        ].filter(id => !revealedIds.includes(id))
      }
    // Remove any cached forecasts that have become stale.
    case REHYDRATE:
      return payload.forecasts
        ? {
            ...payload.forecasts,
            precipForecasts: payload.forecasts.precipForecasts.filter(isForecastForToday)
          }
        : state
    case END_LOAD_FORECASTS:
    case BEGIN_LOAD_FORECASTS:
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

// TODO: change state shape to { [countyName]: { ...payload } } to accomodate history accumulation.
function precipForecasts(state = [], { type, id, countyName, stateAbbr, coords, series }) {
  switch (type) {
    case RECEIVE_FORECAST:
      return [
        ...state.filter(isForecastForToday),
        {
          countyName,
          stateAbbr,
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

function errorLog(state = {}, { type, countyName, stateAbbr, message }) {
  switch (type) {
    case REACH_FORECAST_REQ_LIMIT:
      return {
        ...state,
        didReachReqLimit: true
      }
    case FAIL_TO_RECEIVE_FORECAST:
      const previousMessages = state[countyName] || [];
      return {
        ...state,
        [countyName]: { stateAbbr, messages: [...previousMessages, message] }
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
        didReachReqLimit: false
      }
    default:
      return state;
  }
}

function isFetching(state = false, { type }) {
  switch (type) {
    case BEGIN_LOAD_FORECASTS:
      return true;
    case REACH_FORECAST_REQ_LIMIT:
    case END_LOAD_FORECASTS:
      return false;
    default:
      return state;
  }
}
