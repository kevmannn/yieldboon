import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// import ForecastMap from './ForecastMap';
// import ForecastChart from './ForecastChart';
import { fetchForecastIfNeeded } from '../actions';

class VisualizationDyad extends Component {
  static propTypes = {
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    }
  }

  componentWillReceiveProps({ activeCounties, fetchForecastIfNeeded }) {
    // TODO: axios... (within actions)
    fetchForecastIfNeeded(activeCounties[0]);
  }

  shouldComponentUpdate({ activeCounties }, { highlighted }) {
    return !isEqual(highlighted, this.state.highlighted)
      || !isEqual(activeCounties, this.props.activeCounties)
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

// const getAggregatedPrecipIntensity = createSelector()
// const getDisambiguatedAggregate = createSelector()

function mapStateToProps(state) {
  return {
    forecasts,
    // aggregatedPrecipIntensity: getAggregatedPrecipIntensity(state),
    // disambiguatedAggregate: getDisambiguatedAggregate(state)
  }
}

export default connect(mapStateToProps, { fetchForecastIfNeeded })(VisualizationDyad);
