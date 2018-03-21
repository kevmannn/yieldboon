import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import lowerCase from 'lodash/lowerCase';
import { Motion, spring, presets } from 'react-motion';
import {
  Hint,
  XAxis,
  LineSeries,
  MarkSeries,
  FlexibleXYPlot
} from 'react-vis';

import Loader from './Loader';
// import TimeSpanToggle from './TimeSpanToggle';

export default class ForecastChart extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    highlighted: PropTypes.object,
    onNearestX: PropTypes.func.isRequired,
    selectedFactor: PropTypes.object.isRequired,
    seriesExtremes: PropTypes.arrayOf(PropTypes.number).isRequired,
    inclementForecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
    aggregateActiveForecastSeries: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  shouldComponentUpdate({ isFetching, highlighted, aggregateActiveForecastSeries }) {
    return isFetching !== this.props.isFetching
      || !isEqual(highlighted, this.props.highlighted)
      || !isEqual(aggregateActiveForecastSeries, this.props.aggregateActiveForecastSeries)
  }

  getHintValue({ i, x }) {
    const { aggregateActiveForecastSeries, inclementForecasts } = this.props;
    const chartedYValuesAtHighlighted = [
      aggregateActiveForecastSeries[i].y,
      ...inclementForecasts.map(({ series }) => series[i].y)
    ]
    return {
      x,
      y: Math.min(...chartedYValuesAtHighlighted)
    }
  }

  curve = 'curveNatural';
  primaryStroke = '#7795f8';
  secondaryStroke = '#bdccfc';
  flexibleXYPlotProps = {
    height: 280,
    margin: { top: 10, right: 10, bottom: 20, left: 10 }
  };

  hintDivStyle = {
    padding: '10px 20px',
    borderRadius: '3px',
    background: '#1a223a',
    boxShadow: '0 1px 3px 0 rgba(7, 9, 15, 0.9), 0 1px 1px 0 rgba(7, 9, 15, 0.9), 0 2px 1px -1px rgba(7, 9, 15, 0.7)'
  };

  hintParagraphStyle = {
    fontSize: '0.8em',
    fontFamily: 'Rubik',
    color: '#fcfdff'
  };

  onMouseLeave = () => {
    this.props.onNearestX(null);
  };

  onNearestX = (highlighted = {}) => {
    this.props.onNearestX(highlighted);
  };

  tickFormat = (x) => {
    return moment(x).format('h:mm a');
  };

  axisStyle = {
    text: { fontSize: '0.6em', opacity: '0.7', paddingTop: '10px', fill: this.secondaryStroke }
  };

  render() {
    const {
      isFetching,
      highlighted,
      seriesExtremes,
      selectedFactor: { name: factorName, unitOfMeasure },
      inclementForecasts,
      aggregateActiveForecastSeries
    } = this.props;
    const sortedInclementForecasts = highlighted
      ? inclementForecasts.sort(({ series: a }, { series: b }) => (
          b[highlighted.i].y - a[highlighted.i].y
        ))
      : inclementForecasts
    return (
      <div style={{
        height: '280px',
        display: 'block',
        padding: '10px',
        position: 'relative',
        background: '#151b2d'
      }}>
        {isFetching
          ? <Loader />
          : <FlexibleXYPlot
              {...this.flexibleXYPlotProps}
              yDomain={seriesExtremes}
              onMouseLeave={this.onMouseLeave}>
              {highlighted &&
                <MarkSeries
                  color={this.primaryStroke}
                  opacity={0.2}
                  size={10}
                  data={[
                    { x: highlighted.x, y: highlighted.y },
                    ...sortedInclementForecasts.map(({ series }) => ({
                      x: highlighted.x,
                      y: series[highlighted.i].y
                    }))
                  ]} />}
              {highlighted &&
                <Hint value={this.getHintValue(highlighted)}>
                  <Motion
                    defaultStyle={{ opacity: 0, translation: 50 }}
                    style={{
                      opacity: spring(0.92),
                      translation: spring(0, { ...presets.gentle, precision: 0.01 })
                    }}>
                    {({ opacity, translation }) => (
                      <div style={{
                        ...this.hintDivStyle,
                        opacity,
                        transform: `translateY(${translation}px)`
                      }}>
                        <p style={this.hintParagraphStyle}>
                          {moment(highlighted.x).calendar()}
                          <span style={{ opacity: '0.5' }}>
                            {` (${moment(highlighted.x).fromNow()})`}
                          </span>
                        </p>
                        <div style={{ ...this.hintParagraphStyle, margin: '10px 0px', fontSize: '1.25em' }}>
                          Mean {lowerCase(factorName)}
                          <div style={{ display: 'block', transform: `translateX(${translation}px)`, color: this.primaryStroke }}>
                            {` ${(aggregateActiveForecastSeries[highlighted.i].y).toFixed(4)}${unitOfMeasure} `}
                            <span style={{ ...this.hintParagraphStyle, color: this.primaryStroke, opacity: '0.6' }}>/ hr</span>
                          </div>
                        </div>
                        {sortedInclementForecasts
                          .map(({ id, countyName, series }, i) => (
                            <p
                              key={id}
                              style={{ opacity: 1.4 / (i + 1), fontSize: '0.75em' }}>
                              {countyName}: <span style={{ color: this.secondaryStroke }}>{`${(series[highlighted.i].y).toFixed(4)}${unitOfMeasure} `}</span>
                              <span style={{ opacity: '0.6' }}>/ hr</span>
                            </p>
                          ))}
                      </div>
                    )}
                  </Motion>
                </Hint>}
              <LineSeries
                data={aggregateActiveForecastSeries}
                curve={this.curve}
                stroke={this.primaryStroke}
                strokeWidth={2}
                onNearestX={this.onNearestX} />
              {sortedInclementForecasts.map(({ id, series }, i) => (
                <LineSeries
                  key={id}
                  opacity={0.3 / (i + 1)}
                  data={series}
                  curve={this.curve}
                  stroke={this.secondaryStroke}
                  strokeStyle="dashed"
                  strokeWidth={2} />
              ))}
              <XAxis
                width={0}
                tickSize={0}
                style={this.axisStyle}
                tickTotal={Math.floor(aggregateActiveForecastSeries.length / 8)}
                tickFormat={this.tickFormat} />
            </FlexibleXYPlot>}
      </div>
    )
  }
}
