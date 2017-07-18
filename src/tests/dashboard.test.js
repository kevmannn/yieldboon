import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

import App from '../App';

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
    expect(appWrapper.find('div').children()).toHaveLength(3);
    expect(appWrapper.find('Dashboard')).toBeTruthy();
    expect(store.getState()).toEqual({});
  })
})

describe.skip('chart series', () => {})

describe.skip('state filtering', () => {})

describe.skip('county table filtering', () => {})
