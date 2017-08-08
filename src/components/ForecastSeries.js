import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import {
  XYPlot,
  makeWidthFlexible,
  VerticalBarSeries as BarSeries,
  // VerticalRectSeries as RectSeries
} from 'react-vis';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default class ForecastSeries extends Component {
  static propTypes = {
    series: PropTypes.arrayOf(PropTypes.object).isRequired,
    seriesExtremes: PropTypes.arrayOf(PropTypes.number)
  };

  shouldComponentUpdate({ series }) {
    return !isEqual(series, this.props.series);
  }

  flexibleXYPlotProps = {
    height: 50,
    width: 150,
    opacity: '0.3',
    margin: { top: 20, right: 0, bottom: 10, left: 0 }
  };

  primaryStroke = '#2d3a60';

  render() {
    const { series, seriesExtremes } = this.props;
    return (
      <FlexibleXYPlot
        {...this.flexibleXYPlotProps}
        yDomain={seriesExtremes}>
        <BarSeries
          // onNearestXY={this.onNearestXY}
          data={series}
          color={this.primaryStroke}/>
      </FlexibleXYPlot>
    )
  }
}
