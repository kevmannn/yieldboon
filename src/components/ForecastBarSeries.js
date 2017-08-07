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

export default class ForecastBarSeries extends Component {
  static propTypes = {
    series: PropTypes.arrayOf(PropTypes.object).isRequired,
    seriesExtremes: PropTypes.arrayOf(PropTypes.number)
  };

  shouldComponentUpdate({ series }) {
    return !isEqual(series, this.props.series);
  }

  flexibleXYPlotProps = {
    height: 50,
    width: 100,
    opacity: '0.5',
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  };

  primaryStroke = '#7795f8';

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
