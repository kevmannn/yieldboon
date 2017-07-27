import React from 'react';
// import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import { fullState } from './utils';
import App from '../App';
import * as selectors from '../selectors';
import ForecastSynopsis from '../components/ForecastSynopsis';
import ForecastChart from '../components/ForecastChart';
// import CountyRegistry from '../components/CountyRegistry';

const mockStore = configureStore();
const renderAppWithState = (state) => {
  const store = mockStore(state);
  const appWrapper =  mount(
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>
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

describe('ForecastSynopsis', () => {
  const props = {
    highlighted: null,
    forecastTotals: selectors.getForecastTotals(fullState)
  }
  const forecastSynopsisWrapper = shallow(<ForecastSynopsis {...props} />);
  expect(forecastSynopsisWrapper.find('div').children()).toHaveLength(14);
})

describe('ForecastChart', () => {
  const props = {
    isFetching: false,
    onNearestX: jest.fn(),
    seriesExtremes: selectors.getSeriesExtremes(fullState),
    inclementForecasts: selectors.getInclementForecasts(fullState),
    aggregateActiveForecastSeries: selectors.getAggregateActiveForecastSeries(fullState)
  }
  const forecastChartWrapper = shallow(<ForecastChart {...props} />);
  expect(forecastChartWrapper.find('FlexibleXYPlot')).toBeTruthy();
})

describe.skip('CountyRegistry', () => {})
