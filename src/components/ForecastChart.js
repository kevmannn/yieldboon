import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { fromJS } from 'immutable';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import { Motion, spring, presets } from 'react-motion';
import {
  Hint,
  XAxis,
  LineSeries,
  MarkSeries,
  FlexibleXYPlot
} from 'react-vis';

import Loader from './Loader';

export default class ForecastChart extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    highlighted: PropTypes.object,
    onNearestX: PropTypes.func.isRequired,
    seriesExtremes: PropTypes.arrayOf(PropTypes.number).isRequired,
    inclementForecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
    aggregateActiveForecastSeries: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  shouldComponentUpdate({ isFetching, highlighted, aggregateActiveForecastSeries }) {
    return isFetching !== this.props.isFetching
      || !isEqual(highlighted, this.props.highlighted)
      || !isEqual(aggregateActiveForecastSeries, this.props.aggregateActiveForecastSeries)
  }

  curve = 'curveNatural';
  primaryStroke = '#7795f8';
  secondaryStroke = '#bdccfc';
  flexibleXYPlotProps = {
    height: 300,
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
      inclementForecasts,
      aggregateActiveForecastSeries
    } = this.props;
    return (
      <div style={{
        height: '300px',
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
                    ...inclementForecasts.map(({ series }) => ({
                      x: highlighted.x,
                      y: series[highlighted.i].y
                    }))
                  ]} />}
              {highlighted &&
                <Hint value={{ x: highlighted.x, y: aggregateActiveForecastSeries[highlighted.i].y }}>
                  <Motion
                    defaultStyle={{ opacity: 0, translation: 50 }}
                    style={{
                      opacity: spring(0.88),
                      translation: spring(0, { ...presets.stiff, precision: 1 })
                    }}>
                    {({ opacity, translation }) => (
                      <div style={{
                        ...this.hintDivStyle,
                        opacity,
                        transform: `translateY(${translation}px)`
                      }}>
                        <p style={this.hintParagraphStyle}>
                          {moment(highlighted.x).calendar()}
                          <span style={{ ...this.hintParagraphStyle, opacity: '0.6' }}>
                            {` (${moment(highlighted.x).fromNow()})`}
                          </span>
                        </p>
                        <p style={{ ...this.hintParagraphStyle, margin: '10px 0px', fontSize: '1.25em' }}>
                          Mean rainfall intensity:
                          <span style={{ color: this.primaryStroke }}>
                            {` ${(aggregateActiveForecastSeries[highlighted.i].y).toFixed(4)}" `}
                          </span>
                          <span style={{ ...this.hintParagraphStyle, color: this.primaryStroke, opacity: '0.6' }}>/ hr</span>
                        </p>
                        <h2 style={{ ...this.hintParagraphStyle, opacity: '0.6', fontWeight: '300', fontSize: '0.75em' }}>
                          In counties with highest mean rainfall:
                        </h2>
                        {inclementForecasts
                          .sort(({ series: a }, { series: b }) => b[highlighted.i].y - a[highlighted.i].y)
                          .map(({ id, countyName, series }, i) => (
                            <p key={id} style={{ color: this.secondaryStroke, opacity: 1.4 / (i + 1), fontSize: '0.75em' }}>
                              {`${countyName}: ${(series[highlighted.i].y).toFixed(4)}" `}
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
              {inclementForecasts.map(({ id, series }, i) => (
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
