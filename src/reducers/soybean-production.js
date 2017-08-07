// import { fromJS } from 'immutable';
import {
  REQUEST_SOYBEAN_PRODUCTION,
  RECEIVE_SOYBEAN_PRODUCTION,
  FAIL_TO_RECEIVE_SOYBEAN_PRODUCTION
} from '../actions';

export default (state = { didFailToFetch: false }, action) => {
  const { type, payload } = action;
  switch (type) {
    case FAIL_TO_RECEIVE_SOYBEAN_PRODUCTION:
      return {
        ...state,
        didFailToFetch: true,
        isFetching: isFetching(state.isFetching, action)
      }
    case REQUEST_SOYBEAN_PRODUCTION:
      return {
        ...state,
        isFetching: isFetching(state.isFetching, action)
      }
    case RECEIVE_SOYBEAN_PRODUCTION:
      return {
        payload,
        didFailToFetch: false,
        lastUpdated: Date.now(),
        isFetching: isFetching(state.isFetching, action)
      }
    default:
      return state;
  }
}

function isFetching(state = false, { type }) {
  switch (type) {
    case REQUEST_SOYBEAN_PRODUCTION:
      return true;
    case FAIL_TO_RECEIVE_SOYBEAN_PRODUCTION:
    case RECEIVE_SOYBEAN_PRODUCTION:
      return false;
    default:
      return state;
  }
}
