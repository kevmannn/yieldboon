import React from 'react';
import thunk from 'redux-thunk';
// import nock from 'nock';
import configureStore from 'redux-mock-store';

import forecasts from '../reducers/forecasts';
import * as actions from '../actions';
import * as selectors from '../selectors';

const mockStore = configureStore([thunk]);

describe('forecasts reducer', () => {
  it('has default state', () => {
    expect(forecasts(undefined, {})).toEqual({
      blacklist: [],
      precipForecasts: []
    })
  })
})

const emptyState = {
  soybeanProduction: {},
  forecasts: {
    blacklist: [],
    precipForecasts: []
  }
}

describe.skip('forecast action creators', () => {
  const store = mockStore(emptyState);
  afterEach(() => {
    // nock.cleanAll();
    store.clearActions();
  })

  it('fetches forecasts for soybeanProduction sites if they are needed', async () => {
    expect.assertions(4);
    await store.dispatch(actions.fetchSoybeanProductionIfNeeded());
    expect(store.getActions().find(({ type }) => type === actions.RECEIVE_SOYBEAN_PRODUCTION)).toBeTruthy();
    const [ , { payload } ] = store.getActions();
    await store.dispatch(actions.loadForecasts(payload.slice(0, 2)));
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(4);
    expect(storeActions.find(({ type }) => type === actions.RECEIVE_FORECAST)).toBeTruthy();
    expect(Object.keys(storeActions[storeActions.length - 1])).toEqual(['type', 'countyName', 'coords', 'series']);
  })
})

describe.skip('forecast selectors', () => {
  it('can derive activeForecasts from state', () => {
    expect(selectors.getActiveForecasts(emptyState)).toEqual([]);
  })

  it('can derive the aggregateActiveForecastSeries from state', () => {
    expect(selectors.getAggregateActiveForecastSeries(emptyState)).toEqual([]);
  })
})
