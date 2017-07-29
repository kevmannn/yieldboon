import forecasts from '../reducers/forecasts';
import selectedState from '../reducers/selected-state';
import soybeanProduction from '../reducers/soybean-production';

import * as actions from '../actions';

describe('forecasts', () => {
  it('has default state', () => {
    expect(forecasts(undefined, {})).toEqual({
      disallowedIds: [],
      precipForecasts: []
    })
  })

  it('accumulates failed req messages in errorLog', () => {
    const state = forecasts(undefined, {
      type: actions.FAIL_TO_RECEIVE_FORECAST,
      countyName: 'x',
      stateAbbr: 'y',
      message: 'Something went wrong'
    })
    expect(state.errorLog).toEqual(expect.objectContaining({
      x: { stateAbbr: 'y', messages: ['Something went wrong'] }
    }))
    const nextState = forecasts(state, {
      type: actions.RECEIVE_FORECAST,
      countyName: 'x'
    })
    expect(nextState.errorLog).toEqual({ didReachReqLimit: false });
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
