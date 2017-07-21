import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
// import { spring, Motion } from 'react-motion';
import {
  Hint,
  // XAxis,
  // YAxis,
  XYPlot,
  LineSeries,
  MarkSeries,
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

  componentDidUpdate() {
    // console.log(this.props);
  }

  curve = 'curveMonotoneX';
  primaryStroke = '#7795f8';
  strokeHierarchy = ['#6286fc', '#4671fc', '#3a69ff'];
  flexibleXYPlotProps = {
    height: 220,
    margin: { top: 0, right: 20, bottom: 20, left: 20 }
  };

  axisStyle = { text: { fontSize: '0.6em' } };

  hintParagraphStyle = {
    fontSize: '0.9em',
    fontFamily: 'Noto Sans',
    color: '#f4f7ff'
  };

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
      inclementForecasts,
      aggregateActiveForecastSeries
    } = this.props;
    return (
      <div style={{
        height: '220px',
        display: 'block',
        padding: '10px',
        margin: '5px',
        position: 'relative',
        background: '#151b2d'
      }}>
        <FlexibleXYPlot
          {...this.flexibleXYPlotProps}
          yDomain={seriesExtremes}
          onMouseLeave={this.onMouseLeave}>
          {highlighted &&
            <MarkSeries
              color={this.primaryStroke}
              opacity={0.2}
              size={8}
              data={[
                { x: highlighted.x, y: highlighted.y },
                ...inclementForecasts.map(({ series }) => ({
                  x: highlighted.x,
                  y: series[highlighted.i].y
                }))
              ]} />}
          {highlighted &&
            <Hint value={{ x: highlighted.x, y: aggregateActiveForecastSeries[highlighted.i].y }}>
              <div style={{
                opacity: '0.95',
                padding: '10px 20px',
                borderRadius: '3px',
                background: '#212b47',
                boxShadow: '0 1px 3px 0 rgba(7, 9, 15, 0.9), 0 1px 1px 0 rgba(7, 9, 15, 0.9), 0 2px 1px -1px rgba(7, 9, 15, 0.4)'
              }}>
                <p style={this.hintParagraphStyle}>{moment(highlighted.x).calendar()}</p>
                <p style={this.hintParagraphStyle}>
                  {aggregateActiveForecastSeries[highlighted.i].y}
                </p>
              </div>
            </Hint>}
          <LineSeries
            data={aggregateActiveForecastSeries}
            curve={this.curve}
            stroke={this.primaryStroke}
            strokeWidth={2}
            onNearestX={this.onNearestX} />
          {inclementForecasts.map(({ id, series }, i) => (
            <LineSeries
              key={id}
              opacity={0.4}
              data={series}
              curve={this.curve}
              stroke={this.strokeHierarchy[i]}
              strokeWidth={2} />
          ))}
        </FlexibleXYPlot>
      </div>
    )
  }
}
