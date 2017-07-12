import { REQUEST_FORECAST, RECEIVE_FORECAST } from '../actions';

const msInDay = 8.64e+7;

export default (state = [], { type, countyName, coords, series }) => {
  switch (type) {
    case REQUEST_FORECAST:
      return [
        ...state,
        {
          countyName,
          isFetching: true
        }
      ]
    case RECEIVE_FORECAST:
      // Append the new forecast to the prexisting, removing any that are now stale.
      return [
        ...state.filter(({ countyName: name, lastUpdated }) => {
          return name !== countyName && Date.now() - lastUpdated < 7 * msInDay;
        }),
        {
          countyName,
          coords,
          series,
          isFetching: false,
          lastUpdated: Date.now()
        }
      ]
    default:
      return state;
  }
}
