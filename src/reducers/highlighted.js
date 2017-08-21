import { Map } from 'immutable';
import { UPDATE_HIGHLIGHTED } from '../actions';

export default (state = {}, { type, highlighted }) => {
  switch (type) {
    case UPDATE_HIGHLIGHTED:
      return Map(highlighted);
    default:
      return state;
  }
}
