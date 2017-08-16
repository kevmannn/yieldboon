import { combineReducers } from 'redux';

import timeSpan from './time-span';
import forecasts from './forecasts';
import selectedState from './selected-state';
// import highlighted from './highlighted';
// import selectedFactors from './selected-factors';
import soybeanProduction from './soybean-production';

export default combineReducers({
  timeSpan,
  forecasts,
  selectedState,
  soybeanProduction
})
