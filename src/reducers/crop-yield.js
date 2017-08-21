// import { List } from 'immutable';
import {
  REQUEST_CROP_YIELD,
  RECEIVE_CROP_YIELD,
  FAIL_TO_RECEIVE_CROP_YIELD
} from '../actions';

export default (state = { didFailToFetch: false }, action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_CROP_YIELD:
      return {
        ...state,
        isFetching: isFetching(state.isFetching, action)
      }
    case FAIL_TO_RECEIVE_CROP_YIELD:
      return {
        ...state,
        didFailToFetch: true,
        isFetching: isFetching(state.isFetching, action)
      }
    case RECEIVE_CROP_YIELD:
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
    case REQUEST_CROP_YIELD:
      return true;
    case FAIL_TO_RECEIVE_CROP_YIELD:
    case RECEIVE_CROP_YIELD:
      return false;
    default:
      return state;
  }
}
