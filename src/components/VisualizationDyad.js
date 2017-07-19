import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import isEqual from 'lodash/isEqual';
// import { spring, presets, TransitionMotion } from 'react-motion';

// import ForecastChart from './ForecastChart';
// import ForecastScorecard from './ForecastScorecard';
import * as selectors from '../selectors';

class VisualizationDyad extends PureComponent {
  static propTypes = {
    activeForecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
    aggregateSeriesExtremes: PropTypes.array.isRequired,
    aggregateActiveForecastSeries: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    }
  }

  componentDidUpdate() {
    // console.log(this.props);
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
    // const { highlighted } = this.state;
    // const {
    //   activeForecasts,
    //   aggregateSeriesExtremes,
    //   aggregateActiveForecastSeries
    // } = this.props;
    return (
      <div>
        {/*<ForecastScorecard
          highlighted={highlighted}
          activeForecasts={activeForecasts} />*/}
        {/*<ForecastChart
          highlighted={highlighted}
          onNearestX={this.onNearestX}
          activeForecasts={activeForecasts}
          aggregateSeriesExtremes={aggregateSeriesExtremes}
          aggregateActiveForecastSeries={aggregateActiveForecastSeries} />*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeForecasts: selectors.getActiveForecasts(state),
    aggregateSeriesExtremes: selectors.getAggregateSeriesExtremes(state),
    aggregateActiveForecastSeries: selectors.getAggregateActiveForecastSeries(state)
  }  
}

export default connect(mapStateToProps)(VisualizationDyad);
