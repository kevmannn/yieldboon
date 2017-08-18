import { SELECT_FACTOR } from '../actions';

const defaultState = {
  availableFactors: [
    { name: 'precipIntensity', unitOfMeasure: '"' },
    // { name: 'windSpeed', unitOfMeasure: 'mph' }
  ],
  selectedFactor: { name: 'precipIntensity', unitOfMeasure: '"' }
}

export default (state = defaultState, { type, factorName: name }) => {
  switch (type) {
    case SELECT_FACTOR:
      const { availableFactors } = defaultState;
      return {
        ...state,
        selectedFactor: {
          name,
          unitOfMeasure: availableFactors.find(({ name: nm }) => nm === name).unitOfMeasure
        }
      }
    default:
      return state;
  }
}
