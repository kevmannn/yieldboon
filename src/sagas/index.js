import { select, take, takeEvery, put, all } from 'redux-saga/effects';

// import * as api from '../api';
import * as actions from '../actions';
import { getPrecipForecasts } from '../selectors';

function* fetchForecast({ countyName, stateAbbr }) {
  const precipForecasts = yield select(getPrecipForecasts);
  if (!precipForecasts.find(({ countyName: name }) => name === countyName)) {
    // TODO: ..
    // const payload = yield call(api.requestForecast, { countyName, stateAbbr });
    // yield put(actions.RECEIVE_FORECAST, payload);
  } else {
    Promise.resolve();
  }
}

export function* watchFetchForecasts() {
  yield takeEvery(actions.FETCH_FORECAST, fetchForecast);
}

export default function* root() {
  yield all([
    watchFetchForecasts()
  ])
}
