import forecasts from '../reducers/forecasts';

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
