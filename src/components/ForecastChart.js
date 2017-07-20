import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
// import { spring, Motion } from 'react-motion';
import {
  // Hint,
  // XAxis,
  // YAxis,
  XYPlot,
  LineSeries,
  // MarkSeries,
  makeWidthFlexible
} from 'react-vis';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default class ForecastChart extends Component {
  static propTypes = {
    highlighted: PropTypes.object,
    onNearestX: PropTypes.func.isRequired,
    seriesExtremes: PropTypes.arrayOf(PropTypes.number).isRequired,
    inclementForecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
    aggregateActiveForecastSeries: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  shouldComponentUpdate({ highlighted, aggregateActiveForecastSeries }) {
    return !isEqual(highlighted, this.props.highlighted)
      || !isEqual(aggregateActiveForecastSeries, this.props.aggregateActiveForecastSeries)
  }

  curve = 'curveMonotoneX';
  primaryStroke = '#7795f8';
  // secondaryStroke = '';
  // tertiaryStroke = '';
  // quaternaryStroke = '';
  flexibleXYPlotProps = {
    height: 200,
    margin: { top: 15, right: 20, bottom: 20, left: 30 }
  };

  axisStyle = { text: { fontSize: '0.6em' } };

  onMouseLeave = () => {
    this.props.onNearestX(null);
  };

  onNearestX = (highlighted = {}) => {
    this.props.onNearestX(highlighted);
  };

  // xTickFormat = (date) => {
  //   return moment(new Date(date)).format('MM/DD h:mm a');
  // };

  render() {
    const {
      highlighted,
      seriesExtremes,
      // inclementForecasts,
      aggregateActiveForecastSeries
    } = this.props;
    return (
      <div style={{
        height: '200px',
        display: 'block',
        padding: '10px',
        margin: '5px',
        position: 'relative',
        background: '#fff'
      }}>
        <FlexibleXYPlot
          {...this.flexibleXYPlotProps}
          yDomain={seriesExtremes}
          onMouseLeave={this.onMouseLeave}>
          {highlighted &&
            <LineSeries
              stroke={this.primaryStroke}
              opacity={0.4}
              strokeWidth={1}
              data={[
                { x: highlighted.x, y: seriesExtremes[0] },
                { x: highlighted.x, y: seriesExtremes[1] }
              ]} />}
          <LineSeries
            data={aggregateActiveForecastSeries}
            curve={this.curve}
            stroke={this.primaryStroke}
            strokeWidth={2}
            onNearestX={this.onNearestX} />
        </FlexibleXYPlot>
      </div>
    )
  }
}
