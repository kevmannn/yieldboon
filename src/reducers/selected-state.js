import { SELECT_STATE } from '../actions';

export default (state = 'NY', { type, name }) => {
  switch (type) {
    case SELECT_STATE:
      return name;
    default:
      return state;
  }
}
