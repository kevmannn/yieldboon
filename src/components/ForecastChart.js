import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
// import { spring, Motion } from 'react-motion';
import {
  Hint,
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
  primaryStroke = '#bdccfc';
  strokeHierarchy = ['#7795f8', '#6883dd', '#5b72c1'];
  flexibleXYPlotProps = {
    height: 270,
    margin: { top: 0, right: 10, bottom: 20, left: 10 }
  };

  axisStyle = { text: { fontSize: '0.6em' } };
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
      highlighted,
      seriesExtremes,
      inclementForecasts,
      aggregateActiveForecastSeries
    } = this.props;
    return (
      <div style={{
        height: '270px',
        display: 'block',
        padding: '10px',
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
                background: '#1c243d',
                boxShadow: '0 1px 3px 0 rgba(7, 9, 15, 0.9), 0 1px 1px 0 rgba(7, 9, 15, 0.9), 0 2px 1px -1px rgba(7, 9, 15, 0.4)'
              }}>
                <p style={this.hintParagraphStyle}>
                  {moment(highlighted.x).calendar()}
                  <span style={{ ...this.hintParagraphStyle, opacity: '0.4' }}>
                    {` (${moment(highlighted.x).fromNow()})`}
                  </span>
                </p>
                <p style={{ ...this.hintParagraphStyle, fontSize: '1.2em' }}>
                  mean rainfall: <span style={{ color: this.primaryStroke }}>
                    {`${(aggregateActiveForecastSeries[highlighted.i].y).toFixed(4)}"`}
                  </span>
                </p>
                <h2 style={{ ...this.hintParagraphStyle, fontWeight: '300', fontSize: '0.7em' }}>Counties with most rain:</h2>
                {inclementForecasts.map(({ id, countyName, series }, i) => (
                  // TODO: inclementForecasts is perhaps not the source to use in this case.
                  <p key={id} style={{ color: this.strokeHierarchy[i], opacity: 1.8 / (i + 1), fontSize: '0.7em' }}>
                    {`${countyName}: ${(series[highlighted.i].y).toFixed(4)}"`}
                  </p>
                ))}
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
              opacity={0.5 / (i + 1)}
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
