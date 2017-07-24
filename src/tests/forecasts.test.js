import React from 'react';
import thunk from 'redux-thunk';
// import nock from 'nock';
import configureStore from 'redux-mock-store';

import forecasts from '../reducers/forecasts';
import * as actions from '../actions';
import * as selectors from '../selectors';
// import { USDA_URL } from '../constants';

const mockStore = configureStore([thunk]);

describe('forecasts reducer', () => {
  it('has default state', () => {
    expect(forecasts(undefined, {})).toEqual({
      blacklist: [],
      precipForecasts: []
    })
  })

  it('only contains non-stale forecasts', () => {})

  it('contains all previously fetched forecasts', () => {})
})

const emptyState = {
  selectedState: '',
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

describe('forecast selectors', () => {
  const fullState = {
    ...emptyState,
    selectedState: 'NY',
    soybeanProduction: {
      payload: [{
        stateAbbr: 'CA',
        soybeanYield: 1e7
      }]
    },
    forecasts: {
      blacklist: [],
      precipForecasts: [{
        id: 1,
        coords: {},
        countyName: 'x',
        lastUpdated: Date.now(),
        series: [
          { i: 0, x: Date.now(), y: 0.01 },
          { i: 1, x: Date.now(), y: 0.11 }
        ]
      }]
    }
  }

  const { precipForecasts } = fullState.forecasts;
  it('can derive activeForecasts from state', () => {
    expect(selectors.getActiveForecasts(emptyState)).toEqual([]);
    expect(selectors.getActiveForecasts(fullState)).toEqual(precipForecasts);
  })

  it('can derive aggregateActiveForecastSeries from state', () => {
    expect(selectors.getAggregateActiveForecastSeries(emptyState)).toEqual([]);
    expect(selectors.getAggregateActiveForecastSeries(fullState)).toEqual(precipForecasts[0].series);
  })

  it('can derive activeStates from state', () => {
    expect(selectors.getActiveStates(emptyState)).toEqual({});
    expect(selectors.getActiveStates(fullState)).toEqual({ CA: 1e7 });
  })

  it('can get forecast totals from state', () => {
    expect(selectors.getForecastTotals(emptyState)).toEqual(expect.objectContaining({
      totalCounties: expect.any(Number),
      totalSoybeanYield: expect.any(Number),
      totalRainfall: expect.any(Function)
    }))
  })

  it('can derive inclementForecasts from state', () => {
    expect(selectors.getInclementForecasts(emptyState)).toEqual([]);
    expect(selectors.getInclementForecasts(fullState)).toEqual(precipForecasts);
  })

  it('can derive activeCounties from state', () => {
    const { id, countyName } = precipForecasts[0];
    expect(selectors.getActiveCounties(emptyState)).toEqual([]);
    expect(selectors.getActiveCounties(fullState)).toEqual([{
      id,
      countyName,
      soybeanYield: undefined,
      totalRainfall: 0.12
    }])
  })

  it('can derive seriesExtremes from state', () => {
    expect(selectors.getSeriesExtremes(emptyState)).toEqual([NaN, NaN]);
    expect(selectors.getSeriesExtremes(fullState)).toEqual([0.008, 0.132]);
  })
})
