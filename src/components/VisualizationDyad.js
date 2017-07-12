import React, { PureComponent } from 'react';
// import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createSelector } from 'reselect';

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

// const getAggregatePrecipIntensitySeries = createSelector()
// const getDisambiguatedAggregateSeries = createSelector()

function mapStateToProps({ forecasts }) {
  return {
    forecasts,
    // aggregatedPrecipIntensitySeries: getAggregatePrecipIntensitySeries(state),
    // disambiguatedAggregateSeries: getDisambiguatedAggregateSeries(state)
  }
}

export default connect(mapStateToProps, { loadForecasts })(VisualizationDyad);
