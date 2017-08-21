// import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import factors from './factors';
import timeSpan from './time-span';
import forecasts from './forecasts';
import cropYield from './crop-yield';
import highlighted from './highlighted';
import selectedState from './selected-state';

export default combineReducers({
  factors,
  timeSpan,
  forecasts,
  cropYield,
  highlighted,
  selectedState
})
