import { createSelector } from 'reselect';
// import { createArraySelector } from 'reselect-map';

const getBlacklist = ({ forecasts: { blacklist } }) => blacklist;
const getSelectedState = ({ selectedState }) => selectedState;
const getPrecipForecasts = ({ forecasts: { precipForecasts } }) => precipForecasts;
const getSoybeanYieldBounds = ({ soybeanYieldBounds }) => soybeanYieldBounds;
const getSoybeanProductionPayload = ({ soybeanProduction: { payload } }) => payload;

// Filter soybeanProduction.payload for entities that fall within the criteria of state membership and yield bounds.
export const getPayloadSubset = createSelector(
  [getSelectedState, getSoybeanYieldBounds, getSoybeanProductionPayload],
  (selectedState = '', { lowerbound = 0, upperbound = 1e8 } = {}, payload = []) => (
    payload.filter(({ stateAbbr: abbr, soybeanYield: soy }) => {
      return abbr === selectedState && (soy > lowerbound && soy < upperbound);
    })
  )
)

// Correlate allowed precipForecasts (and coordinates) with their soybean payloads.
export const getActiveForecasts = createSelector(
  [getBlacklist, getPrecipForecasts, getPayloadSubset],
  (blacklist, precipForecasts, payloadSubset) => (
    precipForecasts
      .filter(({ countyName }) => blacklist.indexOf(countyName) === -1)
      .map(({ countyName, ...rest }) => {
        const correlatedPayload = payloadSubset.find(({ countyName: name }) => name === countyName);
        return {
          ...rest,
          ...correlatedPayload,
          countyName
        }
      })
      // .sort(({ series: a = [] }, { series: b = [] }) => {
      //   const getSeriesMean = series => series.reduce((acc, { y }) => y + acc, 0) / series.length;
      //   return getSeriesMean(a) + getSeriesMean(b);
      // })
  )
)

// Get data to display in CountyRegistry's table.
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

// Find the extremes across all y series within activeForecasts.
export const getAggregateSeriesExtremes = createSelector(
  getActiveForecasts,
  (forecasts) => {
    const allYValues = forecasts
      .map(({ series }) => series.map(({ y }) => y))
      .reduce((acc, yValues) => [...acc, ...yValues], [])

    return [0.8 * Math.min(...allYValues), 1.2 * Math.max(...allYValues)];
  }
)
