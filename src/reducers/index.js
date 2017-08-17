import { combineReducers } from 'redux';

import factors from './factors';
import timeSpan from './time-span';
import forecasts from './forecasts';
import selectedState from './selected-state';
// import highlighted from './highlighted';
import soybeanProduction from './soybean-production';

export default combineReducers({
  factors,
  timeSpan,
  forecasts,
  selectedState,
  soybeanProduction
})
