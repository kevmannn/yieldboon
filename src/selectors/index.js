import { createSelector } from 'reselect';
// import { Map, fromJS } from 'immutable';
// import { createArraySelector } from 'reselect-map';

const getErrorLog = ({ forecasts: { errorLog } }) => errorLog;
const getPrecipForecasts = ({ forecasts: { precipForecasts } }) => precipForecasts;
const getCropYieldPayload = ({ cropYield: { payload } }) => payload;

export const getSelectedFactor = ({ factors: { selectedFactor } }) => selectedFactor;
export const getAvailableFactors = ({ factors: { availableFactors } }) => availableFactors;
export const getSelectedTimeSpan = ({ timeSpans: { selectedTimeSpan } }) => selectedTimeSpan;
export const getDisallowedIds = ({ forecasts: { disallowedIds } }) => disallowedIds;
export const getIsFetching = ({ forecasts: { isFetching } }) => isFetching;
export const getSelectedState = ({ selectedState }) => selectedState;
export const getDidFailToFetch = ({ cropYield: { didFailToFetch } }) => didFailToFetch;
export const getDidReachReqLimit = ({ forecasts: { errorLog } }) => errorLog && errorLog.didReachReqLimit;
export const getIsFetchingCropYield = ({ cropYield: { isFetching }}) => isFetching;

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

// Filter cropYield payload for entities that are within the selectedState.
export const getPayloadSubset = createSelector(
  [getSelectedState, getCropYieldPayload],
  (selectedState, payload = []) => (
    payload.filter(({ stateAbbr }) => stateAbbr === selectedState)
  )
)

// Pull an array of the unique state abbreviations present in the crop data.
const getUniqueStateAbbrs = createSelector(
  getCropYieldPayload,
  (payload = []) => {
    const seen = new Set();
    const uniqueStateAbbrs = [];
    for (let i = 0; i < payload.length; i++) {
      const stateAbbr = payload[i].stateAbbr;
      if (seen.has(stateAbbr)) {
        continue;
      }
      seen.add(stateAbbr);
      uniqueStateAbbrs.push(stateAbbr);
    }
    return uniqueStateAbbrs;
  }
)

// Associate stateAbbrs with booleans indicating whether forecasts for this state have been cached or
// have failed to fetch.
export const getActiveStates = createSelector(
  [getUniqueStateAbbrs, getPrecipForecasts, getErrorLog],
  (uniqueStateAbbrs, precipForecasts, errorLog) => (
    uniqueStateAbbrs
      .map((stateAbbr) => ({
        [stateAbbr]: {
          // totalYield: abbreviateInt(uniqueStateAbbrs[stateAbbr]),
          didError: !!Object.keys(errorLog).find(key => errorLog[key] && errorLog[key].stateAbbr === stateAbbr),
          isCached: !!precipForecasts.find(({ stateAbbr: state }) => state === stateAbbr)
        },
      }))
    .reduce((acc, correlation) => ({...acc, ...correlation}), {})
  )
)

// TODO: Account for precipForecasts becoming an object which associates { [stateName]: [ ...forecasts ] }.
// Correlate allowed precipForecasts (and coordinates) with their yield payloads.
const getForecastPayloadCorrelation = createSelector(
  [getPrecipForecasts, getPayloadSubset, getSelectedState],
  (precipForecasts, payloadSubset, selectedState) => (
    precipForecasts
      .filter(({ stateAbbr }) => selectedState === stateAbbr)
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

// Pull forecasts with allowed ids.
export const getActiveForecasts = createSelector(
  [getDisallowedIds, getForecastPayloadCorrelation],
  (disallowedIds, correlatedForecasts) => (
    correlatedForecasts.filter(({ id }) => !disallowedIds.includes(id))
  )
)

// Pull an object with totals across all current forecasts.
export const getForecastTotals = createSelector(
  [getActiveForecasts, getSelectedState],
  (forecasts = [], selectedState) => (
    forecasts.every(({ series }) => series)
      ? {
          selectedState,
          totalCounties: forecasts.length,
          totalCropYield: abbreviateInt(forecasts.reduce((acc, { cropYield }) => acc + cropYield, 0)),
          totalChartedValue: (i) => (
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
  getForecastPayloadCorrelation,
  (correlatedForecasts = []) => (
    correlatedForecasts.every(({ series }) => series)
      ? correlatedForecasts
          .sort(({ cropYield: a }, { cropYield: b }) => b - a)
          .map(({ id, countyName, cropYield, series }) => ({
              id,
              countyName,
              cropYield: `${abbreviateInt(cropYield)} bu`,
              chartedValueTotal: `${series.reduce((acc, { y }) => acc + y, 0).toFixed(3)}"`,
              chartedValueSeries: series
                .filter(({ i }) => i % 2 === 0)
                .map(({ x, y }) => ({ x, y: y + 0.005 }))
            }))
      : []
  )
)

// TODO: Limit the number of times this O(n^2) work needs to be performed by using https://github.com/HeyImAlex/reselect-map (?)
// Construct a new series (= collection) containing the mean y value at each i across all series within activeForecasts.
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
      // Inject noise if all ys within a series are effectively zero.
      .map(({ series, ...rest }) => (
        series.every(({ y }) => parseFloat(y.toFixed(2)) === 0)
          ? {
              ...rest,
              series: series.map((dataPoint, i) => (
                i === 0 ? { ...dataPoint, y: Math.random() * 0.01 } : dataPoint
              ))
            }
          : { series, ...rest }
      ))
      .slice(0, 3)
  )
)

// Find the extremes for all y series within activeForecasts.
export const getSeriesExtremes = createSelector(
  getInclementForecasts,
  (forecasts) => {
    const [ min, max ] = findExtremesAcrossForecasts(forecasts);
    const isDominatedByZeroedYs = forecasts
      .map(({ series }) => findYMean(series))
      .filter(yMean => parseFloat(yMean.toFixed(3)) === 0)
      .length > Math.floor(forecasts.length * 0.8)
    return [0.85 * min, (!isDominatedByZeroedYs ? 1.15 : 1.8) * max];
  }
)

function abbreviateInt(n) {
  return n >= 1e3
    ? n >= 1e6
      ? `${String(n).slice(0, -6)}.${String(n).slice(-6, -4)}m`
      : `${String(n).slice(0, -3)}k`
    : `${n}`
}

function findYMean(series) {
  return series.reduce((acc, { y }) => acc + y, 0);
}

function findExtremesAcrossForecasts(forecasts, field = 'y') {
  return forecasts
    .map(({ series = [] }) => series.map(dataPoint => dataPoint[field]))
    .reduce((acc, fieldValues) => [...acc, ...fieldValues] , [])
    .reduce((acc, value) => [Math.min(...acc, value), Math.max(...acc, value)] , [])
}
