import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import isEqual from 'lodash/isEqual';

import * as selectors from '../selectors';
// import ForecastMap from './ForecastMap';
// import ForecastChart from './ForecastChart';

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
    console.log(this.props);
  }

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
        {/*<ForecastChart
          highlighted={highlighted}
          onNearestX={this.onNearestX}
          activeForecasts={activeForecasts}
          ySeriesExtremes={aggregateSeriesExtremes}
          aggregateActiveForecastSeries={aggregateActiveForecastSeries} />
        <ForecastMap
          highlighted={highlighted}
          activeForecasts={activeForecasts} />*/}
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
