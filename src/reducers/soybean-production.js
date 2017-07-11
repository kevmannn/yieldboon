// import { fromJS } from 'immutable';
import { REQUEST_SOYBEAN_PRODUCTION, RECEIVE_SOYBEAN_PRODUCTION } from '../actions';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_SOYBEAN_PRODUCTION:
      return {
        isFetching: true
      }
    case RECEIVE_SOYBEAN_PRODUCTION:
      return {
        payload,
        isFetching: false,
        lastUpdated: Date.now()
      }
    default:
      return state;
  }
}
