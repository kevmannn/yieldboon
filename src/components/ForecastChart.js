import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
// import moment from 'moment';
import {
  // Hint,
  // XAxis,
  // YAxis,
  // GridLines,
  XYPlot,
  LineSeries,
  makeWidthFlexible
} from 'react-vis';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default class ForecastChart extends Component {
  static propTypes = {
    highlighted: PropTypes.object,
    onNearestX: PropTypes.func.isRequired,
    activeForecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
    aggregateSeriesExtremes: PropTypes.arrayOf(PropTypes.number).isRequired,
    aggregateActiveForecastSeries: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  shouldComponentUpdate({ highlighted }) {
    return !isEqual(highlighted, this.props.highlighted);
  }

  curve = 'curveMonotoneX';
  defaultStroke = '#4264FB';
  flexibleXYPlotProps = {
    height: 140,
    margin: { top: 15, right: 20, bottom: 20, left: 30 }
  };

  onMouseLeave = () => {
    this.props.onNearestX(null);
  };

  onNearestX = (highlighted = {}) => {
    this.props.onNearestX(highlighted);
  };

  render() {
    // const {
    //   highlighted,
    //   onNearestX,
    //   activeForecasts,
    //   aggregateSeriesExtremes,
    //   aggregateActiveForecastSeries
    // } = this.props;
    return (
      <div style={{
        height: '300px',
        display: 'block',
        padding: '10px',
        margin: '5px',
        position: 'relative',
        background: '#fff',
        boxShadow: '0 1px 3px 0 rgba(36, 40, 53, 0.3), 0 1px 1px 0 rgba(36, 40, 53, 0.14), 0 2px 1px -1px rgba(36, 40, 53, 0.2)'
      }}>
        {/*<FlexibleXYPlot
          {...this.flexibleXYPlotProps}
          yDomain={aggregateSeriesExtremes}
          onMouseLeave={this.onMouseLeave}>
          <LineSeries
            data={aggregateActiveForecastSeries}
            curve={this.curve}
            stroke={this.defaultStroke}
            strokeWidth={2}
            onNearestX={this.onNearestX} />
        </FlexibleXYPlot>*/}
      </div>
    )
  }
}
