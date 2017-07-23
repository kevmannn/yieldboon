import { createSelector } from 'reselect';
// import { createArraySelector } from 'reselect-map';

const getBlacklist = ({ forecasts: { blacklist } }) => blacklist;
const getPrecipForecasts = ({ forecasts: { precipForecasts } }) => precipForecasts;
const getSoybeanYieldBounds = ({ soybeanYieldBounds }) => soybeanYieldBounds;
const getSoybeanProductionPayload = ({ soybeanProduction: { payload } }) => payload;

export const getIsFetching = ({ forecasts: { isFetching } }) => isFetching;
export const getErrorMessage = ({ forecasts: { errorMessage } }) => errorMessage;
export const getSelectedState = ({ selectedState }) => selectedState;

// Correlate states with their soybean yield.
// export const getActiveStates = createSelector()

// Filter soybeanProduction.payload for entities that fall within the criteria of state membership and yield bounds.
export const getPayloadSubset = createSelector(
  [getSelectedState, getSoybeanYieldBounds, getSoybeanProductionPayload],
  (selectedState, { lowerbound = 0, upperbound = 1e8 } = {}, payload = []) => (
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
      .filter(({ id }) => blacklist.indexOf(id) === -1)
      .map(({ countyName, ...rest }) => {
        const correlatedPayload = payloadSubset.find(({ countyName: name }) => name === countyName);
        return {
          ...rest,
          ...correlatedPayload,
          countyName
        }
      })
  )
)

// Pull an object with totals across all current forecasts.
export const getForecastTotals = createSelector(
  getActiveForecasts,
  (forecasts = []) => (
    forecasts.every(({ series }) => series)
      ? {
          // timespan: findExtremesAcrossForecasts(forecasts, 'x'),
          totalCounties: forecasts.length,
          totalSoybeanYield: forecasts.reduce((acc, { soybeanYield }) => acc + soybeanYield, 0),
          totalRainfall: (i) => (
            forecasts
              .map(({ series }) => series.slice(0, i).reduce((acc, { y }) => acc + y, 0))
              .reduce((acc, seriesTotal) => acc + seriesTotal, 0)
          )
        }
      : []
  )
)

// Get data to display in CountyRegistry's table.
export const getActiveCounties = createSelector(
  getActiveForecasts,
  (forecasts = []) => (
    forecasts.every(({ series }) => series)
      ? forecasts.map(({ id, countyName, soybeanYield, series }) => ({
          id,
          countyName,
          soybeanYield,
          totalRainfall: series.reduce((acc, { y }) => acc + y, 0)
        }))
      : []
  )
)

// TODO: Lessen the O(nm) work that this calc entails by using https://github.com/HeyImAlex/reselect-map (?)
// Construct a new series (= collection) of the mean y value at each i across all series within activeForecasts.
export const getAggregateActiveForecastSeries = createSelector(
  getActiveForecasts,
  ([ firstForecast = {}, ...others ]) => (
    [firstForecast].concat([...others]).every(({ series }) => series)
      ? firstForecast.series.map(({ i, y, ...rest }) => (
        ({
          ...rest,
          i,
          y: ([...others].reduce((acc, { series = [] }) => series[i].y + acc, 0) + y) / (others.length + 1)
        })
      ))
      : []
  )
)

// Find the three forecasts with the highest mean y value.
export const getInclementForecasts = createSelector(
  getActiveForecasts,
  (forecasts) => (
    forecasts
      .sort(({ series: a = [] }, { series: b = [] }) => findYMean(b) - findYMean(a))
      .slice(0, 3)
  )
)

// Find the extremes across all y series within activeForecasts.
export const getSeriesExtremes = createSelector(
  getInclementForecasts,
  (forecasts) => {
    const [ min, max ] = findExtremesAcrossForecasts(forecasts, 'y')
    return [0.8 * min, 1.2 * max];
  }
)

function findYMean(series) {
  return series.reduce((acc, { y }) => acc + y, 0);
}

function findExtremesAcrossForecasts(forecasts, field) {
  return forecasts
    .map(({ series = [] }) => series.map(dataPoint => dataPoint[field]))
    .reduce((acc, fieldValues) => [...acc, ...fieldValues] , [])
    .reduce((acc, value) => [Math.min(...acc, value), Math.max(...acc, value)] , [])
}
