// import nock from 'nock';
import moment from 'moment';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import * as actions from '../actions';
import { FORECAST_URL, FORECAST_API_KEY } from '../constants';

const mockStore = configureStore([thunk]);

describe.skip('forecast action creators', () => {
  // let forecasts;
  const store = mockStore({
    soybeanProduction: { lastUpdated: null }
  })
  beforeEach(async () => {
    // nock.cleanAll();
    store.clearActions();
    await store.dispatch(actions.fetchSoybeanProductionIfNeeded());
    // const [ , { payload } ] = store.getActions();
    // forecasts = await store.dispatch(actions.loadForecasts(payload.slice(0, 2)));
  })

  it('fetches soybean productino payload', () => {
    expect(store.getActions()).toHaveLength(2);
  })

  // it('dispatches appropriate actions for fetch failure', () => {
  //   expect.assertions(2);
  //   const today = moment().format('YYYY-MM-DDTHH:mm:ss');
  //   nock(FORECAST_URL)
  //     .get(`/${FORECAST_API_KEY}/-24.6271516,-70.4054644,${today}`)
  //     .reply(400)

  //   const storeActions = store.getActions();
  //   expect(storeActions.find(({ type }) => type === actions.FAIL_TO_RECEIVE_FORECAST)).toBeTruthy();
  // })
})
