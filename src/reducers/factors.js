import { SELECT_FACTOR } from '../actions';

const defaultState = {
  availableFactors: [
    { name: 'precipIntensity' },
    // { name: 'windSpeed' }
  ],
  selectedFactor: { name: 'precipIntensity' }
}

export default (state = defaultState, { type, factorName: name }) => {
  switch (type) {
    case SELECT_FACTOR:
      return {
        ...state,
        selectedFactor: {
          name
        }
      }
    default:
      return state;
  }
}
