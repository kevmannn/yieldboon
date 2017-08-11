import { combineReducers } from 'redux';

import forecasts from './forecasts';
import timeSpans from './time-spans';
import selectedState from './selected-state';
import soybeanProduction from './soybean-production';

export default combineReducers({
  forecasts,
  timeSpans,
  selectedState,
  soybeanProduction
})
