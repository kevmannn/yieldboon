import { select, take, takeEvery, put, all } from 'redux-saga/effects';

import { api } from '../services';
import * as actions from '../actions';
import { getPrecipForecasts } from '../selectors';

function* fetchForecast({ countyName, stateAbbr }) {
  const precipForecasts = yield select(getPrecipForecasts);
  if (!precipForecasts.find(({ countyName: name }) => name === countyName)) {
    // try { 
    //   const payload = yield call(api.requestForecast, { countyName, stateAbbr });
    //   yield put(actions.RECEIVE_FORECAST, payload);
    // } catch (err) {
    //   yield put(actions.FAIL_TO_RECEIVE_FORECAST, err);
    // }
  } else {
    Promise.resolve();
  }
}

function* fetchCropYield() {
  try {
    const payload = yield call(api.requestCropYield);
    yield put(actions.RECEIVE_CROP_YIELD, payload);
  } catch (err) {
    yield put(actions.FAIL_TO_RECEIVE_CROP_YIELD, err);
  }
}

export function* watchFetchForecast() {
  yield takeEvery(actions.FETCH_FORECAST, fetchForecast);
}

export function* watchFetchCropYield() {
  yield takeEvery(actions.REQUEST_CROP_YIELD, fetchCropYield);
}

export default function* root() {
  yield all([
    watchFetchForecast()
  ])
}
