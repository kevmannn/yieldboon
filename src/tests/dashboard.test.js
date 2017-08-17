import React from 'react';
// import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import App from '../App';
// import Dashboard from '../Dashboard';
import { fullState } from './utils';
import * as selectors from '../selectors';
import VisualizationDyad from '../components/VisualizationDyad';
import ForecastSynopsis from '../components/ForecastSynopsis';
import ForecastChart from '../components/ForecastChart';
import CountyRegistry from '../components/CountyRegistry';
import DialogInitiator from '../components/DialogInitiator';
// import FactorMenu from '../components/FactorMenu';
// import ErrorLogger from '../components/ErrorLogger';
// import ForecastSeries from '../components/ForecastSeries';
// import TimeSpanToggle from '../components/TimeSpanToggle';
import StateSelectionDialog from '../components/StateSelectionDialog';

const mockStore = configureStore();
const mountComponentWithState = (Component, state, props = {}) => {
  const store = mockStore(state);
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    </BrowserRouter>
  )

  return [store, wrapper];
}

describe('App', () => {
  it('renders app', () => {
    const [ store, wrapper ] = mountComponentWithState(App, {});
    expect(wrapper.find('div').children()).toHaveLength(2);
    expect(wrapper.find('div').childAt(1).props().path).toEqual('/dashboard/:selectedState');
    expect(store.getState()).toEqual({});
  })
})

describe('VisualizationDyad', () => {
  it('passes highlighted object to children', () => {
    const [ , wrapper ] = mountComponentWithState(VisualizationDyad, fullState);
    expect(wrapper.find('ForecastSynopsis').props()).toEqual(expect.objectContaining({
      activeCounties: expect.any(Array),
      forecastTotals: expect.any(Object),
      highlighted: null
    }))
    // TODO: ...
    // wrapper.instance().setState({ highlighted: {} });
    // expect(wrapper.find('ForecastSynopsis').props().highlighted).toEqual({});
  })
})

describe('ForecastSynopsis', () => {
  const props = {
    highlighted: null,
    forecastTotals: selectors.getForecastTotals(fullState)
  }
  const wrapper = shallow(<ForecastSynopsis {...props} />);
  // TODO: ...
  it('renders total rainfall within the selected state', () => {})

  it('renders the number of counties with allowed ids for the selected state', () => {})

  it('renders the accumulated rainfall at the highlighted value', () => {})
})

describe('ForecastChart', () => {
  const props = {
    isFetching: false,
    onNearestX: jest.fn(),
    highlighted: { i: 0, x: Date.now(), y: 1 },
    seriesExtremes: selectors.getSeriesExtremes(fullState),
    inclementForecasts: selectors.getInclementForecasts(fullState),
    aggregateActiveForecastSeries: selectors.getAggregateActiveForecastSeries(fullState)
  }
  const wrapper = shallow(<ForecastChart {...props} />);
  it('renders the chart', () => {
    expect(wrapper.find('FlexibleXYPlot')).toHaveLength(1);
    expect(wrapper.find('LineSeries')).toHaveLength(3);
  })

  it('renders the hint when highlighted is truthy', () => {
    const { highlighted: { i, x }, aggregateActiveForecastSeries } = props;
    expect(wrapper.find('Hint').props().value).toEqual({
      x,
      y: aggregateActiveForecastSeries[i].y
    })
  })

  it('only renders MarkSeries for ys in inclementForecasts and aggregateActiveForecastSeries', () => {
    expect(props.inclementForecasts).toHaveLength(2);
    const data = wrapper.find('MarkSeries').props().data;
    expect(data).toHaveLength(3);
    expect(data.map(({ y }) => y)).toEqual([1, 0.02, 0.01]);
  })
})

describe('CountyRegistry', () => {
  it('renders the correct number of children', () => {
    const [ , wrapper ] = mountComponentWithState(CountyRegistry, fullState, { selectedState: 'NY' });
    expect(wrapper.find('TableBody')).toHaveLength(1);
    expect(wrapper.find({ checked: true })).toHaveLength(3);
  })
})

describe('DialogInitiator', () => {
  it('opens the given dialog when clicked', () => {
    const wrapper = shallow(<DialogInitiator icon={null} dialog={<StateSelectionDialog />} />);
    expect(wrapper.instance().state).toEqual({ dialogIsOpen: false });
    // TODO: ...
    // wrapper.find({ onClick: jest.fn() }).simulate('click');
    // expect(wrapper.instance().state).toEqual({ dialogIsOpen: true });
  })
})

// TODO: ...
describe.skip('StateDialog', () => {
  it('renders the correct number of states', () => {})
})

// TODO: ...
describe.skip('ErrorLogger', () => {
  it('renders an error message when no longer fetching whilst there are errorLogMessages', () => {
    // const forecasts = { ...fullState.forecasts, isFetching: false, errorLogMessages: ['doom'] };
    // const [ , wrapper ] = mountComponentWithState(ErrorLogger, { ...fullState, ...forecasts });
    // expect(wrapper.find('div').childAt(0)).toEqual({});
  })
})
