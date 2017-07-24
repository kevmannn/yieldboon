import { SELECT_STATE } from '../actions';

export default (state = 'NY', { type, stateName }) => {
  switch (type) {
    case SELECT_STATE:
      return stateName;
    default:
      return state;
  }
}
