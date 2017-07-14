import { combineReducers } from 'redux';
// import { fromJS } from 'immutable';

import forecasts from './forecasts';
// import errorMessage from './error-message';
import selectedState from './selected-state';
import soybeanProduction from './soybean-production';
import soybeanYieldBounds from './soybean-yield-bounds';

export default combineReducers({
  forecasts,
  // errorMessage,
  selectedState,
  soybeanProduction,
  soybeanYieldBounds
})
