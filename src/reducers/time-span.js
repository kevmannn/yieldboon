import { SELECT_TIME_SPAN } from '../actions';

const defaultState = {
  selectedTimeSpan: { range: '24h' },
  possibleTimeSpanRanges: ['24h', '1d', '2d']
}

export default (state = defaultState, action) => {
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
