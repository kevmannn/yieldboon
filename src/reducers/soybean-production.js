// import { fromJS } from 'immutable';
import {
  // REQUEST_SOYBEAN_PRODUCTION,
  RECEIVE_SOYBEAN_PRODUCTION,
  FAIL_TO_RECEIVE_SOYBEAN_PRODUCTION
} from '../actions';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FAIL_TO_RECEIVE_SOYBEAN_PRODUCTION:
      return {
        didFailToFetch: true
      }
    case RECEIVE_SOYBEAN_PRODUCTION:
      return {
        payload,
        didFailToFetch: false,
        lastUpdated: Date.now()
      }
    default:
      return state;
  }
}
