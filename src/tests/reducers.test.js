import forecasts from '../reducers/forecasts';
import selectedState from '../reducers/selected-state';
import soybeanProduction from '../reducers/soybean-production';

// import * as actions from '../actions';

describe('forecasts', () => {
  it('has default state', () => {
    expect(forecasts(undefined, {})).toEqual({
      disallowedIds: [],
      precipForecasts: []
    })
  })
})

describe('selectedState', () => {
  it('has default state', () => {
    expect(selectedState(undefined, {})).toEqual('NY');
  })
})

describe('soybeanProduction', () => {
  it('has default state', () => {
    expect(soybeanProduction(undefined, {})).toEqual({
      didFailToFetch: false
    })
  })
})
