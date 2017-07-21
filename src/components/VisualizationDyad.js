import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { spring, presets, TransitionMotion } from 'react-motion';

// import ForecastScorecard from './ForecastScorecard';
import ForecastChart from './ForecastChart';
import * as selectors from '../selectors';

class VisualizationDyad extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool,
    seriesExtremes: PropTypes.array.isRequired,
    forecastTotals: PropTypes.object.isRequired,
    inclementForecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
    aggregateActiveForecastSeries: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    }
  }

  // springConfig = { ...presets.stiff, precision: 0.9 };

  // motionStyle = {
  //   opacity: spring(1, this.springConfig),
  //   translation: spring(0, this.springConfig)
  // };

  // willEnter = () => {
  //   return {
  //     opacity: 0.8,
  //     translation: -170
  //   }
  // };

  // willLeave = () => {
  //   return {
  //     opacity: spring(0, this.springConfig),
  //     translation: spring(40, this.springConfig)
  //   }
  // };

  onNearestX = (highlighted = {}) => {
    this.setState({ highlighted });
  };

  render() {
    const { highlighted } = this.state;
    const {
      // isFetching,
      seriesExtremes,
      // forecastTotals,
      inclementForecasts,
      aggregateActiveForecastSeries
    } = this.props;
    return (
      <div style={{
        // boxShadow: '0 1px 3px 0 rgba(36, 40, 53, 0.3), 0 1px 1px 0 rgba(36, 40, 53, 0.14), 0 2px 1px -1px rgba(36, 40, 53, 0.2)'
      }}>
        {/*<ForecastScorecard
          isFetching={isFetching}
          highlighted={highlighted}
          forecastTotals={forecastTotals} />*/}
        <ForecastChart
          // isFetching={isFetching}
          highlighted={highlighted}
          onNearestX={this.onNearestX}
          seriesExtremes={seriesExtremes}
          inclementForecasts={inclementForecasts}
          aggregateActiveForecastSeries={aggregateActiveForecastSeries} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: selectors.getIsFetching(state),
    seriesExtremes: selectors.getSeriesExtremes(state),
    forecastTotals: selectors.getForecastTotals(state),
    inclementForecasts: selectors.getInclementForecasts(state),
    aggregateActiveForecastSeries: selectors.getAggregateActiveForecastSeries(state)
  }  
}

export default connect(mapStateToProps)(VisualizationDyad);
