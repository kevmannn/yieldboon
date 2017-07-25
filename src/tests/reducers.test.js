import forecasts from '../reducers/forecasts';

describe('forecasts reducer', () => {
  it('has default state', () => {
    expect(forecasts(undefined, {})).toEqual({
      blacklist: [],
      precipForecasts: []
    })
  })

  it('effectively only contains forecasts for today', () => {})

  it('contains all previously fetched forecasts', () => {})
})
