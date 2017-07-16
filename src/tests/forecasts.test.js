import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';

import App from '../App';
import forecasts from '../reducers/forecasts';
import * as actions from '../actions';

const mockStore = configureStore([thunk]);

describe('app initialization', () => {
  const store = mockStore({});
  it('renders app', () => {
    const appWrapper = shallow(<App store={store} />).shallow();
    expect(appWrapper.find('div').children()).toHaveLength(3);
  })
})

// describe.skip('forecasts reducer', () => {})

// describe.skip('forecast action creators', () => {})
