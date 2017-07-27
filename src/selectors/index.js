import { createSelector } from 'reselect';
// import { createArraySelector } from 'reselect-map';

const getErrorLog = ({ forecasts: { errorLog } }) => errorLog;
const getDisallowedIds = ({ forecasts: { disallowedIds } }) => disallowedIds;
const getPrecipForecasts = ({ forecasts: { precipForecasts } }) => precipForecasts;
const getSoybeanProductionPayload = ({ soybeanProduction: { payload } }) => payload;

export const getIsFetching = ({ forecasts: { isFetching } }) => isFetching;
export const getSelectedState = ({ selectedState }) => selectedState;
export const getDidFailToFetch = ({ soybeanProduction: { didFailToFetch } }) => didFailToFetch;

// Pull an object containing any error messages specific to the selected state.
export const getErrorLogMessages = createSelector(
  [getErrorLog, getSelectedState],
  (errorLog = {}, selectedState) => (
    Object.keys(errorLog)
      .filter(key => errorLog[key] && errorLog[key].stateAbbr === selectedState)
      .reduce((acc, keyBelongingToSelectedState) => (
        [...acc, ...errorLog[keyBelongingToSelectedState].messages]
      ), [])
  )
)

// Filter soybeanProduction payload for entities that are within the selectedState.
export const getPayloadSubset = createSelector(
  [getSelectedState, getSoybeanProductionPayload],
  (selectedState, payload = []) => (
    payload.filter(({ stateAbbr }) => stateAbbr === selectedState)
  )
)

// Correlate states with their total (= across all of their counties) soybean yield.
const getYieldTotalsForStates = createSelector(
  getSoybeanProductionPayload,
  (payload = []) => (
    payload.reduce((acc, { stateAbbr, soybeanYield }) => ({
      ...acc,
      [stateAbbr]: (acc[stateAbbr] || 0) + soybeanYield
    }), {})
  )
)

// Pair yield total abbreviation with boolean indicating whether forecasts for this state have been cached.
export const getActiveStates = createSelector(
  [getYieldTotalsForStates, getPrecipForecasts, getErrorLog],
  (yieldTotals, precipForecasts, errorLog) => (
    Object.keys(yieldTotals)
      .map((stateAbbr) => ({
        [stateAbbr]: {
          total: abbreviateInt(yieldTotals[stateAbbr]),
          didError: !!Object.keys(errorLog).find(key => errorLog[key] && errorLog[key].stateAbbr === stateAbbr),
          isCached: !!precipForecasts.find(({ stateAbbr: state }) => state === stateAbbr)
        },
      }))
      .reduce((acc, correlation) => ({...acc, ...correlation}), {})
  )
)

// TODO: Account for precipForecasts becoming an object which associates { [stateName]: [ ...forecasts ] }.
// Correlate allowed precipForecasts (and coordinates) with their soybean payloads.
export const getActiveForecasts = createSelector(
  [getDisallowedIds, getPrecipForecasts, getPayloadSubset, getSelectedState],
  (disallowedIds, precipForecasts, payloadSubset, selectedState) => (
    precipForecasts
      .filter(({ id, stateAbbr }) => !disallowedIds.includes(id) && selectedState === stateAbbr)
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
  [getActiveForecasts, getSelectedState],
  (forecasts = [], selectedState) => (
    forecasts.every(({ series }) => series)
      ? {
          // timespan: findExtremesAcrossForecasts(forecasts, 'x'),
          selectedState,
          totalCounties: forecasts.length,
          totalSoybeanYield: abbreviateInt(forecasts.reduce((acc, { soybeanYield }) => acc + soybeanYield, 0)),
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

function abbreviateInt(n) {
  return n >= 1e4
    ? n >= 1e6
      ? `${String(n).slice(0, -6)}.${String(n).slice(-6, -4)}m`
      : `${String(n).slice(0, -4)}.${String(n).slice(-4, -2)}k`
    : `${n}`
}

function findYMean(series) {
  return series.reduce((acc, { y }) => acc + y, 0);
}

function findExtremesAcrossForecasts(forecasts, field) {
  return forecasts
    .map(({ series = [] }) => series.map(dataPoint => dataPoint[field]))
    .reduce((acc, fieldValues) => [...acc, ...fieldValues] , [])
    .reduce((acc, value) => [Math.min(...acc, value), Math.max(...acc, value)] , [])
}
