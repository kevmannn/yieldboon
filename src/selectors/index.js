import { createSelector } from 'reselect';
// import { createArraySelector } from 'reselect-map';

const getBlacklist = ({ forecasts: { blacklist } }) => blacklist;
const getSelectedState = ({ selectedState }) => selectedState;
const getPrecipForecasts = ({ forecasts: { precipForecasts } }) => precipForecasts;
const getSoybeanYieldBounds = ({ soybeanYieldBounds }) => soybeanYieldBounds;
const getSoybeanProductionPayload = ({ soybeanProduction: { payload } }) => payload;

// Filter soybeanProduction.payload for entities that fall within the criteria of state membership and yield bounds.
export const getActivePayloads = createSelector(
  [getSelectedState, getSoybeanYieldBounds, getSoybeanProductionPayload],
  (selectedState = '', { lowerbound = 0, upperbound = 1e8 } = {}, payload = []) => (
    payload.filter(({ stateAbbr: abbr, soybeanYield: soy }) => {
      return abbr === selectedState && (soy > lowerbound && soy < upperbound);
    })
  )
)

// Correlate allowed precipForecasts (and coordinates) with their soybean payloads.
export const getActiveForecasts = createSelector(
  [getBlacklist, getPrecipForecasts, getActivePayloads],
  (blacklist, precipForecasts, activePayloads) => (
    precipForecasts
      .filter(({ countyName }) => blacklist.indexOf(countyName) === -1)
      .map(({ countyName, ...rest }) => {
        const correlatedPayload = activePayloads.find(({ countyName: name }) => name === countyName);
        return {
          ...rest,
          ...correlatedPayload,
          countyName
        }
      })
      .sort(({ series: a = [], soybeanYield: c }, { series: b = [], soybeanYield: d }) => {
        // Sort with respect to total rainfall / soybean yield.
        return (a[a.length - 1] / c) - (b[b.length - 1] / d);
      })
  )
)

export const getActiveCounties = createSelector(
  getActiveForecasts,
  (activeForecasts = []) => (
    activeForecasts.length
      ? activeForecasts.map(({ countyName, isFetching, soybeanYield, series }) => ({
          countyName,
          isFetching,
          soybeanYield,
          totalRainfall: series ? parseFloat(series[series.length - 1].y.toFixed(2)) : null
        }))
      : []
  )
)

// TODO: Lessen the O(nm) work that this calc entails by using https://github.com/HeyImAlex/reselect-map (?)
// Construct a new series (= collection) of the mean y value at each i.
export const getAggregateActiveForecastSeries = createSelector(
  getActiveForecasts,
  ([ firstForecast = {}, ...otherForecasts ]) => (
    !firstForecast.isFetching && firstForecast.series
      ? firstForecast.series.map(({ i, y, ...rest }) => {
        return ({
          ...rest,
          i,
          y: ([...otherForecasts].reduce((acc, { series = [] }) => series[i].y + acc, 0) + y) / (otherForecasts.length + 1)
        })
      })
      : []
  )
)

export const getAggregateSeriesExtremes = createSelector(
  getAggregateActiveForecastSeries,
  (series) => {
    const yValues = series.map(({ y }) => y);
    return [0.95 * Math.min(...yValues), 1.05 * Math.max(...yValues)];
  }
)
