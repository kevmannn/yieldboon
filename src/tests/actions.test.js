// import nock from 'nock';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import * as actions from '../actions';
// import { USDA_URL } from '../constants';

const mockStore = configureStore([thunk]);

describe.skip('forecast action creators', () => {
  const store = mockStore({});
  afterEach(() => {
    // nock.cleanAll();
    store.clearActions();
  })

  it('fetches forecasts for soybeanProduction sites', async () => {
    expect.assertions(3);
    await store.dispatch(actions.fetchSoybeanProductionIfNeeded());
    const [ , { payload } ] = store.getActions();
    await store.dispatch(actions.loadForecasts(payload.slice(0, 2)));
    const storeActions = store.getActions();

    expect(storeActions).toHaveLength(6);
    expect(storeActions.find(({ type }) => type === actions.RECEIVE_FORECAST)).toBeTruthy();
    expect(Object.keys(storeActions[storeActions.length - 1])).toEqual(['type', 'countyName', 'coords', 'series']);
  })
})
