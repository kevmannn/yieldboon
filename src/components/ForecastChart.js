import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import { Motion, spring, presets } from 'react-motion';
import {
  Hint,
  XYPlot,
  LineSeries,
  MarkSeries,
  makeWidthFlexible
} from 'react-vis';

import Loader from './Loader';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

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

  curve = 'curveMonotoneX';
  primaryStroke = '#7795f8';
  secondaryStroke = '#bdccfc';
  flexibleXYPlotProps = {
    height: 340,
    margin: { top: 0, right: 10, bottom: 10, left: 10 }
  };

  hintDivStyle = {
    padding: '10px 20px',
    borderRadius: '3px',
    background: '#1a223a',
    boxShadow: '0 1px 3px 0 rgba(7, 9, 15, 0.9), 0 1px 1px 0 rgba(7, 9, 15, 0.9), 0 2px 1px -1px rgba(7, 9, 15, 0.4)'
  };

  hintParagraphStyle = {
    fontSize: '0.8em',
    fontFamily: 'Noto Sans',
    color: '#fcfdff'
  };

  onMouseLeave = () => {
    this.props.onNearestX(null);
  };

  onNearestX = (highlighted = {}) => {
    this.props.onNearestX(highlighted);
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
        height: '340px',
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
                  <Motion
                    defaultStyle={{ opacity: 0, translation: 50 }}
                    style={{
                      opacity: spring(0.9, { ...presets.stiff, precision: 0.1 }),
                      translation: spring(0, { ...presets.stiff, precision: 0.1 })
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
                        <p style={{ ...this.hintParagraphStyle, fontSize: '1.2em' }}>
                          Mean rainfall:
                          <span style={{ color: this.primaryStroke }}>
                            {` ${(aggregateActiveForecastSeries[highlighted.i].y).toFixed(4)}" `}
                          </span>
                          <span style={{ ...this.hintParagraphStyle, color: this.primaryStroke, opacity: '0.6' }}>/ hr</span>
                        </p>
                        <h2 style={{ ...this.hintParagraphStyle, opacity: '0.6', fontWeight: '300', fontSize: '0.7em' }}>
                          In counties with highest mean rainfall:
                        </h2>
                        {inclementForecasts.map(({ id, countyName, series }, i) => (
                          <p key={id} style={{ color: this.secondaryStroke, opacity: 1.5 / (i + 1), fontSize: '0.7em' }}>
                            {`${countyName}: ${(series[highlighted.i].y).toFixed(4)}"`}
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
                  strokeWidth={2} />
              ))}
            </FlexibleXYPlot>}
      </div>
    )
  }
}
