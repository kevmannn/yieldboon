import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import isEqual from 'lodash/isEqual';
// import { createArraySelector } from 'reselect-map';

// import ForecastMap from './ForecastMap';
// import ForecastChart from './ForecastChart';
import { loadForecasts } from '../actions';

class VisualizationDyad extends PureComponent {
  static propTypes = {
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    }
  }

  componentWillReceiveProps({ activeCounties, loadForecasts }) {
    // loadForecasts(activeCounties);
  }

  onNearestX = (highlighted = {}) => {
    this.setState({ highlighted });
  };

  render() {
    // const { highlighted } = this.state;
    return (
      <div>
        {/*<ForecastChart />
        <ForecastMap />*/}
      </div>
    )
  }
}

// TODO: does this belong in ForecastChart (is there a true reliance on activeCounties)?
// TODO: Lessen / avoid this O(n^2) work by using https://github.com/HeyImAlex/reselect-map
// const getAggregatePrecipSeries = createSelector(
//   [getForecasts, getSelectedState],
//   (forecasts, selectedState) => ()
// )

// const getDisambiguatedAggregateSeries = createSelector()

function mapStateToProps({ forecasts }) {
  return {
    forecasts,
    // aggregatedPrecipSeries: getAggregatePrecipSeries(state)
  }
}

export default connect(mapStateToProps, { loadForecasts })(VisualizationDyad);
