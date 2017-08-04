import { v4 } from 'uuid';

import forecasts from '../reducers/forecasts';
import selectedState from '../reducers/selected-state';
import soybeanProduction from '../reducers/soybean-production';

import * as actions from '../actions';

const transformState = (firstActionCreator) => (secondActionCreator) => {
  const state = forecasts(undefined, firstActionCreator);
  return forecasts(state, secondActionCreator);
}

describe('forecasts', () => {
  it('has default state', () => {
    expect(forecasts(undefined, {})).toEqual({
      disallowedIds: [],
      precipForecasts: []
    })
  })

  it('stores disallowedIds', () => {
    const hiddenIds = Array(3).map(() => v4());
    expect(transformState
      ({ type: actions.SET_FORECAST_FILTER, hiddenIds })
      ({ type: actions.SET_FORECAST_FILTER, revealedIds: hiddenIds })
    .disallowedIds).toHaveLength(0)
  })

  it('stores didReachReqLimit', () => {
    const state = forecasts(undefined, {
      type: actions.REACH_FORECAST_REQ_LIMIT
    })
    expect(state.errorLog.didReachReqLimit).toBe(true);
  })

  it('accumulates failed req messages in errorLog', () => {
    expect(forecasts(undefined, {
      type: actions.FAIL_TO_RECEIVE_FORECAST,
      countyName: 'here',
      stateAbbr: 'XY',
      message: 'Everything is wrecked and grey.'
    }).errorLog).toEqual({ here: { stateAbbr: 'XY', messages: ['Everything is wrecked and grey.'] } })
  })

  it('stores isFetching', () => {
    expect(forecasts(undefined, { type: actions.BEGIN_LOAD_FORECASTS }).isFetching).toBe(true);
    expect(forecasts(undefined, { type: actions.END_LOAD_FORECASTS }).isFetching).toBe(false);
  })

  it('stores precipForecasts', () => {
    expect(forecasts(undefined, {
      type: actions.RECEIVE_FORECAST,
      countyName: 'x',
      stateAbbr: 'y',
      coords: {},
      series: [],
      id: 1
    }).precipForecasts).toHaveLength(1)
  })
})

describe('selectedState', () => {
  it('has default state', () => {
    expect(selectedState(undefined, {})).toEqual('NY');
  })

  it('holds the last selected state', () => {
    expect(selectedState(undefined, {
      type: actions.SELECT_STATE,
      stateName: 'x'
    })).toEqual('x')
  })
})

describe('soybeanProduction', () => {
  it('has default state', () => {
    expect(soybeanProduction(undefined, {})).toEqual({
      didFailToFetch: false
    })
  })

  it('stores a received paylod', () => {
    expect(soybeanProduction(undefined, {
      type: actions.RECEIVE_SOYBEAN_PRODUCTION,
      payload: [{}, {}]
    }).payload).toHaveLength(2)
  })
})
