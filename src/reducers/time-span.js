import { SELECT_TIME_SPAN } from '../actions';

export default (state = { selectedTimeSpan: {} }, action) => {
  switch (action.type) {
    case SELECT_TIME_SPAN:
      return {
        ...state,
        selectedTimeSpan: selectedTimeSpan(state.selectedTimeSpan)
      }
    default:
      return state;
  }
}

function selectedTimeSpan(state = {}, { type, timeSpan }) {
  switch (type) {
    case SELECT_TIME_SPAN:
      return timeSpan;
    default:
      return state;
  }
}
