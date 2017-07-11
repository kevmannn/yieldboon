import React from 'react';
import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import App from '../App';
// import * as actions from '../actions';

const mockStore = configureStore([thunk]);
const store = mockStore({})

describe('app initialization', () => {
  it('renders app', () => {
    const appWrapper = shallow(<App store={store} />).shallow();
    expect(appWrapper.find('div').children()).toHaveLength(3);
  })
})

describe.skip('yield-fetching actions', () => {
  afterEach(() => {
    store.clearActions();
  })
})
