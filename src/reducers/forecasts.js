import { REQUEST_FORECAST, RECEIVE_FORECAST } from '../actions';

export default (state = [], { type, countyName, coords, series }) => {
  switch (type) {
    // TODO: solve duplicate with and without series bug...
    case REQUEST_FORECAST:
      return [
        ...state,
        {
          countyName,
          isFetching: true
        }
      ]
    case RECEIVE_FORECAST:
      const msInDay = 8.64e+7;
      // Append the new forecast to the prexisting, removing any that are now stale.
      return [
        ...state,
        {
          countyName,
          coords,
          series,
          isFetching: false,
          lastUpdated: Date.now()
        }
      ].filter(({ lastUpdated }) => Date.now() - lastUpdated < 7 * msInDay)
    default:
      return state;
  }
}
