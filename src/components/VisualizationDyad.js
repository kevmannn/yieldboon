import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createSelector } from 'reselect';

// import ForecastMap from './ForecastMap';
// import ForecastChart from './ForecastChart';
import { fetchForecastIfNeeded } from '../actions';

class VisualizationDyad extends Component {
  static propTypes = {
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired,
    // provided via connect:
    forecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
    // activeForecasts: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    }
  }

  componentWillReceiveProps({ activeCounties, fetchForecastIfNeeded }) {
    activeCounties.forEach(county => fetchForecastIfNeeded(county));
  }

  shouldComponentUpdate({ activeCounties }, { highlighted }) {
    return !isEqual(highlighted, this.state.highlighted)
      || !isEqual(activeCounties, this.props.activeCounties)
  }

  onNearestX = (highlighted = {}) => {
    this.setState({ highlighted });
  };

  render() {
    // const { activeCounties, forecasts } = this.props;
    // const { highlighted } = this.state;
    return (
      <div>
        {/*<ForecastChart
          highlighted={highlighted}
          onNearestX={this.onNearestX}
          activeCounties={activeCounties}
          activeForecasts={activeForecasts} />
        <ForecastMap
          highlighted={highlighted}
          activeCounties={activeCounties} />*/}
      </div>
    )
  }
}

// const getActiveForecasts = createSelector(
//   [getForecasts, getActiveCounties],
//   (forecasts, activeCounties) => (
//     forecasts.filter(({ countyName }) => {})
//   )
// )

// const getTotalRainfall = createSelector()

function mapStateToProps({ forecasts }) {
  return { forecasts };
}

export default connect(mapStateToProps, { fetchForecastIfNeeded })(VisualizationDyad);
