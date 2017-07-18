import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
// import Paper from 'material-ui/Paper';
import {
  // Hint,
  XYPlot,
  LineSeries,
  AreaSeries,
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

  shouldComponentUpdate({ highlighted, aggregateActiveForecastSeries }) {
    return !isEqual(highlighted, this.props.highlighted)
      || !isEqual(aggregateActiveForecastSeries, this.props.aggregateActiveForecastSeries)
  }

  curve = 'curveMonotoneX';
  defaultStroke = '#7795f8';
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

  xTickFormat = (date) => {
    return moment(new Date(date)).format('MM/DD h:mm a');
  };

  render() {
    const {
      highlighted,
      // activeForecasts,
      aggregateSeriesExtremes,
      aggregateActiveForecastSeries
    } = this.props;
    return (
      <div style={{
        height: '200px',
        display: 'block',
        padding: '10px',
        margin: '5px',
        position: 'relative',
        background: '#fff',
        boxShadow: '0 1px 3px 0 rgba(36, 40, 53, 0.3), 0 1px 1px 0 rgba(36, 40, 53, 0.14), 0 2px 1px -1px rgba(36, 40, 53, 0.2)'
      }}>
        <FlexibleXYPlot
          {...this.flexibleXYPlotProps}
          yDomain={aggregateSeriesExtremes}
          onMouseLeave={this.onMouseLeave}>
          {highlighted &&
            <LineSeries
              stroke={this.defaultStroke}
              opacity={0.4}
              strokeWidth={1}
              data={[
                { x: highlighted.x, y: aggregateSeriesExtremes[0] },
                { x: highlighted.x, y: aggregateSeriesExtremes[1] }
              ]} />}
          <LineSeries
            data={aggregateActiveForecastSeries}
            curve={this.curve}
            stroke={this.defaultStroke}
            strokeWidth={2}
            onNearestX={this.onNearestX} />
          {/*<AreaSeries
            data={aggregateActiveForecastSeries}
            opacity={0.5}
            color={this.defaultStroke}
            curve={this.curve} />*/}
        </FlexibleXYPlot>
      </div>
    )
  }
}
