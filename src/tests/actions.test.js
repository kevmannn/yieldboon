// import nock from 'nock';
import moment from 'moment';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import * as actions from '../actions';

const mockStore = configureStore([thunk]);

describe.skip('forecast action creators', () => {
  let forecasts;
  const store = mockStore({
    cropYield: { lastUpdated: null }
  })
  beforeEach(async () => {
    // nock.cleanAll();
    store.clearActions();
    await store.dispatch(actions.fetchCropYieldIfNeeded());
    const [ , { payload } ] = store.getActions();
    forecasts = await store.dispatch(actions.loadForecasts(payload.slice(0, 2)));
  })

  it('fetches soybean production payload', () => {
    expect(store.getActions()).toHaveLength(2);
  })

  it('dispatches appropriate actions for forecast fetch failure', () => {
    // const today = moment().format('YYYY-MM-DDTHH:mm:ss');
    // nock('https://yieldboon-api.now.sh')
    //   .get(`/forecast?location=${lat}+${lng}?time=${today}`)
    //   .reply(400)

    const storeActions = store.getActions();
    expect(storeActions.find(({ type }) => type === actions.FAIL_TO_RECEIVE_FORECAST)).toBeTruthy();
  })
})
