import { combineReducers } from 'redux';

import factors from './factors';
// import highlighted from './highlighted';
import timeSpan from './time-span';
import forecasts from './forecasts';
import cropYield from './crop-yield';
import selectedState from './selected-state';

export default combineReducers({
  factors,
  timeSpan,
  forecasts,
  cropYield,
  selectedState
})
