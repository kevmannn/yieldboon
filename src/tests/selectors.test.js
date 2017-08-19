import * as selectors from '../selectors';
import { emptyState, fullState } from './utils';

describe('forecast selectors', () => {
  it('can derive activeForecasts from state', () => {
    expect(selectors.getActiveForecasts(emptyState)).toEqual([]);
    expect(selectors.getActiveForecasts(fullState)).toEqual(fullState.forecasts.precipForecasts);
  })

  it('can derive aggregateActiveForecastSeries from state', () => {
    expect(selectors.getAggregateActiveForecastSeries(emptyState)).toEqual([]);
    expect(selectors.getAggregateActiveForecastSeries(fullState)).toEqual([
      { i: 0, x: expect.any(Number), y: 0.015 },
      { i: 1, x: expect.any(Number), y: 0.165 }
    ])
  })

  it('can derive errorLogMessages from state', () => {
    expect(selectors.getErrorLogMessages(emptyState)).toEqual([]);
    expect(selectors.getErrorLogMessages(fullState)).toEqual(['abyssal', 'doom']);
  })

  it('can derive activeStates from state', () => {
    expect(selectors.getActiveStates(emptyState)).toEqual({});
    expect(selectors.getActiveStates(fullState)).toEqual({
      CA: { isCached: true, didError: true }
    })
  })

  // TODO: ...
  it('preserves an equivalence for totals between getForecastTotals and getActiveStates', () => {})

  it('can get forecastTotals from state', () => {
    expect(selectors.getForecastTotals(emptyState)).toEqual(expect.objectContaining({
      selectedState: expect.any(String),
      totalCounties: expect.any(Number),
      totalCropYield: expect.any(String),
      totalChartedValue: expect.any(Function)
    }))
  })

  it('can derive inclementForecasts from state', () => {
    expect(selectors.getInclementForecasts(emptyState)).toEqual([]);
    expect(selectors.getInclementForecasts(fullState)).toHaveLength(2);
  })

  // TODO: ...
  it('creates noise if all ys within an inclementForecast series are effectively zero', () => {})

  it('can derive activeCounties from state', () => {
    expect(selectors.getActiveCounties(emptyState)).toEqual([]);
    expect(selectors.getActiveCounties(fullState)[0]).toEqual({
      id: '1',
      countyName: 'x',
      cropYield: expect.any(String),
      totalRainfall: expect.any(String),
      rainfallIntensity: expect.any(Array)
    })
  })

  it('can derive seriesExtremes from state', () => {
    expect(selectors.getSeriesExtremes(emptyState)).toEqual([NaN, NaN]);
    expect(selectors.getSeriesExtremes(fullState)).toEqual([expect.any(Number), expect.any(Number)]);
  })
})
