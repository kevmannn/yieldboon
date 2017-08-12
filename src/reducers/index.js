import { combineReducers } from 'redux';

import timeSpan from './time-span';
import forecasts from './forecasts';
import selectedState from './selected-state';
import soybeanProduction from './soybean-production';

export default combineReducers({
  timeSpan,
  forecasts,
  selectedState,
  soybeanProduction
})
