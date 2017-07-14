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
  (selectedState = '', { lowerbound = 0, upperbound = 1e8 }, payload = []) => (
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
          countyName,
          // meanSeries,
          correlatedPayload
        }
      })
  )
)

// TODO: Lessen / avoid the O(n^2) work that the `meanSeries` calc entails by using
// https://github.com/HeyImAlex/reselect-map?
// export const getAggregateActiveForecastSeries = createArraySelector(
//   [getActiveForecasts],
//   (activeForecast) => {}
// )
