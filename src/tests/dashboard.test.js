import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount, configure } from 'enzyme';

import App from '../App';
// import Dashboard from '../Dashboard';
import { fullState } from './utils';
import * as selectors from '../selectors';

import VisualizationTriad from '../components/VisualizationTriad';
import ForecastSynopsis from '../components/ForecastSynopsis';
import ForecastChart from '../components/ForecastChart';
import CountyRegistry from '../components/CountyRegistry';
import DialogInitiator from '../components/DialogInitiator';
import StateSelectionDialog from '../components/StateSelectionDialog';

configure({ adapter: new Adapter() });

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

describe.skip('VisualizationTriad', () => {
  it('passes highlighted object to children', () => {
    const [ , wrapper ] = mountComponentWithState(VisualizationTriad, fullState);
    expect(wrapper.find('ForecastSynopsis').props()).toEqual(expect.objectContaining({
      activeCounties: expect.any(Array),
      selectedFactor: expect.any(Object),
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
    selectedFactor: selectors.getSelectedFactor(fullState),
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
    selectedFactor: selectors.getSelectedFactor(fullState),
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
      y: expect.any(Number)
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
  const props = { selectedState: 'NY', selectedFactor: selectors.getSelectedFactor(fullState) };
  const [ , wrapper ] = mountComponentWithState(CountyRegistry, fullState, props);
  it('renders the correct number of children', () => {
    expect(wrapper.find('TableBody')).toHaveLength(1);
  })

  // TODO: ..
  it('renders rows for every key in activeCounties', () => {
    // const numKeysInActiveCounties = Object.keys(selectors.getActiveCounties(fullState)).length;
    // expect(wrapper.find('TableRow')).toHaveLength(numKeysInActiveCounties);
  })
})

describe('DialogInitiator', () => {
  it('opens the given dialog when clicked', () => {
    const wrapper = shallow(
      <DialogInitiator
        icon={null}
        dialog={<StateSelectionDialog />} />
    )
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
