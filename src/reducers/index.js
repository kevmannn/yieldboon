import { combineReducers } from 'redux';
// import { fromJS } from 'immutable';

import forecasts from './forecasts';
import selectedState from './selected-state';
import soybeanProduction from './soybean-production';

export default combineReducers({
  forecasts,
  selectedState,
  soybeanProduction
})
