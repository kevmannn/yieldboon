import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import App from '../App';
import ForecastSynopsis from '../components/ForecastSynopsis';

const mockStore = configureStore();
const renderAppWithState = (state) => {
  const store = mockStore(state);
  const appWrapper =  mount(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )

  return [store, appWrapper];
}

describe('app initialization', () => {
  const [ store, appWrapper ] = renderAppWithState({});
  it('renders app', () => {
    expect(appWrapper.find('div').children()).toHaveLength(2);
    expect(appWrapper.find('Dashboard')).toBeTruthy();
    expect(store.getState()).toEqual({});
  })
})

describe.skip('ForecastSynopsis', () => {
  const props = { highlighted: {}, forecastTotals: {} }
  const forecastSynopsisWrapper = shallow(<ForecastSynopsis {...props} />);
})

describe.skip('ForecastChart', () => {})

describe.skip('CountyRegistry', () => {})
