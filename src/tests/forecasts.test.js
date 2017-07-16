import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import App from '../App';
import forecasts from '../reducers/forecasts';
import * as actions from '../actions';
// import VisualizationDyad from '../components/VisualizationDyad';

const mockStore = configureStore([thunk]);

describe('app initialization', () => {
  const store = mockStore();
  const appWrapper = shallow(<App store={store} />).shallow();
  it('renders app', () => {
    expect(appWrapper.find('div').children()).toHaveLength(3);
  })
})

describe('forecasts reducer', () => {
  it('returns default state', () => {
    expect(forecasts(undefined, {})).toEqual({
      blacklist: [],
      precipForecasts: []
    })
  })
})

describe('forecast action creators', () => {
  const initialState = {
    soybeanProduction: {},
    forecasts: {
      blacklist: [],
      precipForecasts: []
    }
  }
  const store = mockStore(initialState);
  afterEach(() => {
    store.clearActions();
  })

  it('fetches forecasts for soybeanProduction sites if they are needed', async () => {
    expect.assertions(4);
    await store.dispatch(actions.fetchSoybeanProductionIfNeeded());
    expect(store.getActions().find(({ type }) => type === actions.RECEIVE_SOYBEAN_PRODUCTION)).toBeTruthy();
    const [ , { payload } ] = store.getActions();
    await store.dispatch(actions.loadForecasts(payload.slice(0, 2)));
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(4);
    expect(storeActions.find(({ type }) => type === actions.RECEIVE_FORECAST)).toBeTruthy();
    expect(Object.keys(storeActions[storeActions.length - 1])).toEqual(['type', 'countyName', 'coords', 'series']);
  })
})
