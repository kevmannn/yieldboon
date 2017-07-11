import { CHANGE_SOYBEAN_YIELD_BOUNDS } from '../actions';

export default (state = {}, { type, lowerbound, upperbound }) => {
  switch (type) {
    case CHANGE_SOYBEAN_YIELD_BOUNDS:
      return { lowerbound, upperbound };
    default:
      return state;
  }
}
