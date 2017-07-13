import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import isEqual from 'lodash/isEqual';
// import { createSelector } from 'reselect';
// import { createArraySelector } from 'reselect-map';

// import ForecastMap from './ForecastMap';
// import ForecastChart from './ForecastChart';
import { loadForecasts } from '../actions';

class VisualizationDyad extends PureComponent {
  static propTypes = {
    // activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    }
  }

  // TODO: mv to Dashboard?
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

// const getBlacklist = ({ forecasts: { blacklist } }) => blacklist;
// const getPrecipForecasts = ({ forecasts: { precipForecasts } }) => precipForecasts;
// const getActiveForecasts = createSelector(
//   [getBlacklist, getPrecipForecasts],
//   (blacklist, precipForecasts) => (
//     precipForecasts.filter(({ countyName }) => blacklist.indexOf(countyName) === -1)
//   )
// )

// TODO: Lessen / avoid the O(n^2) work this entails by using https://github.com/HeyImAlex/reselect-map
// const getAggregatePrecipSeries = createArraySelector(
//   [getForecasts, getSelectedState],
//   (forecast, selectedState) => ()
// )

// const getDisambiguatedAggregateSeries = createSelector()

function mapStateToProps(state) {
  return {
    // activePrecipForecasts: getActiveForecasts(state),
    // aggregatedPrecipSeries: getAggregatePrecipSeries(state)
  }
}

export default connect(mapStateToProps, { loadForecasts })(VisualizationDyad);
