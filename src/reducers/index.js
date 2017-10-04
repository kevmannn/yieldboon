import { combineReducers } from 'redux';
// import grokReorders from 'redux-reorder';

// import { RECEIVE_FORECAST as reorderType } from '../actions';

// import search from './search';
import factors from './factors';
import timeSpan from './time-span';
import forecasts from './forecasts';
import cropYield from './crop-yield';
import selectedState from './selected-state';

export default combineReducers({
  // search,
  factors,
  timeSpan,
  forecasts,
  // forecasts: grokReorders(forecasts, { step: 2, reorderType }),
  cropYield,
  selectedState
})
