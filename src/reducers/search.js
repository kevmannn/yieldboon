import { UPDATE_SEARCH } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return state;
    default:
      return state;
  }
}
