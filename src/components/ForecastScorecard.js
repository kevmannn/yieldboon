import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import lowerCase from 'lodash/lowerCase';

export default class ForecastScorecard extends PureComponent {
  static propTypes = {
    // highlighted: PropTypes.object,
    forecastTotals: PropTypes.shape({
      timespan: PropTypes.array,
      totalSoybeanYield: PropTypes.number,
      totalRainfall: PropTypes.number
    }).isRequired
  };

  // momentize(unixTime) {
  //   return moment(unixTime).calendar();
  // }

  renderTotal(key) {
    const { forecastTotals } = this.props;
    switch (key) {
      // case 'timespan':
      //   return `${this.momentize(forecastTotals[key][0])} - ${this.momentize(forecastTotals[key][1])}`;
      case 'totalCounties':
        return forecastTotals[key];
      case 'totalSoybeanYield':
        return `${forecastTotals[key]} bu`;
      case 'totalRainfall':
        return `${forecastTotals[key].toFixed(4)}"`;
      default:
        return null;
    }
  }

  render() {
    const {
      // highlighted,
      forecastTotals
    } = this.props;
    return (
      <div>
        {Object.keys(forecastTotals).reverse().map((key, i) => (
          <div
            key={i}
            style={{
              display: 'inline-block',
              width: '120px',
              padding: '5px 15px',
              fontFamily: 'Noto Sans'
            }}>
            <p style={{ color: '#1c243d', opacity: '0.5', fontSize: '0.5em' }}>{lowerCase(key)}:</p>
            <p style={{ color: '#1c243d', fontSize: '1em', fontWeight: '300', margin: '10px 0px' }}>
              {this.renderTotal(key)}
            </p>
          </div>
        ))}
      </div>
    )
  }
}
