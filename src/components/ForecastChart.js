import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
// import moment from 'moment';
// import { createSelector } from 'reselect';
import {
  // Hint,
  // XAxis,
  // YAxis,
  XYPlot,
  LineSeries,
  makeWidthFlexible
} from 'react-vis';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default class ForecastChart extends Component {
  static propTypes = {
    onNearestX: PropTypes.func.isRequired,
    highlighted: PropTypes.object,
    // aggregatedPrecipSeries: PropTypes.arrayOf(PropTypes.object).isRequired
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

  ySeriesExtremes = [];

  onMouseLeave = () => {
    this.props.onNearestX(null);
  };

  onNearestX = (highlighted = {}) => {
    this.props.onNearestX(highlighted);
  };

  render() {
    const { data } = this.props;
    const [ yMin, yMax ] = this.ySeriesExtremes;
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
          yDomain={[yMin, yMax]}
          onMouseLeave={this.onMouseLeave}>
          <LineSeries
            data={data}
            curve={this.curve}
            stroke={this.defaultStroke}
            strokeWidth={2}
            onNearestX={this.onNearestX} />
        </FlexibleXYPlot>*/}
      </div>
    )
  }
}
