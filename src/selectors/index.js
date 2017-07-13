import { createSelector } from 'reselect';
// import { createArraySelector } from 'reselect-map';

const getSelectedState = ({ selectedState }) => selectedState;
const getSoybeanYieldBounds = ({ soybeanYieldBounds }) => soybeanYieldBounds;
const getSoybeanProductionPayload = ({ soybeanProduction: { payload } }) => payload;

// Filter soybeanProduction.payload for entities that fall within the criteria of state membership and yield bounds.
export const getActiveCounties = createSelector(
  [getSelectedState, getSoybeanYieldBounds, getSoybeanProductionPayload],
  (selectedState = '', { lowerbound = 0, upperbound = 1e8 }, payload = []) => (
    payload.filter(({ stateAbbr: abbr, soybeanYield: soy }) => {
      return abbr === selectedState && (soy > lowerbound && soy < upperbound);
    })
  )
)

// const getBlacklist = ({ forecasts: { blacklist } }) => blacklist;
// const getPrecipForecasts = ({ forecasts: { precipForecasts } }) => precipForecasts;
// export const getActiveForecasts = createSelector(
//   [getBlacklist, getPrecipForecasts],
//   (blacklist, precipForecasts) => (
//     precipForecasts.filter(({ countyName }) => blacklist.indexOf(countyName) === -1)
//   )
// )

// TODO: Lessen / avoid the O(n^2) work this entails by using https://github.com/HeyImAlex/reselect-map
// export const getAggregatePrecipSeries = createArraySelector(
//   [getForecasts, getSelectedState],
//   (forecast, selectedState) => ()
// )

// export const getDisambiguatedAggregateSeries = createSelector()
