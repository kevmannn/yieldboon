import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lowerCase from 'lodash/lowerCase';

// import ErrorLogger from './ErrorLogger';
// import DialogInitiator from './DialogInitiator';

export default class ForecastSynopsis extends PureComponent {
  static propTypes = {
    highlighted: PropTypes.object,
    forecastTotals: PropTypes.shape({
      // timespan: PropTypes.array,
      selectedState: PropTypes.string,
      totalCounties: PropTypes.number,
      totalSoybeanYield: PropTypes.number,
      totalRainfall: PropTypes.func
    }).isRequired
  };

  renderTotal(key) {
    const { forecastTotals } = this.props;
    switch (key) {
      case 'totalSoybeanYield':
        return `${forecastTotals[key]} bu`;
      case 'totalRainfall':
        return `${forecastTotals[key](24).toFixed(2)}"`;
      default:
        return forecastTotals[key];
    }
  }

  totals = Object.keys(this.props.forecastTotals).reverse();

  render() {
    const { highlighted, forecastTotals } = this.props;
    return (
      <div>
        {this.totals.map((key, i) => (
          <div
            key={i}
            style={{
              display: 'inline-block',
              width: '110px',
              padding: '5px 15px',
              fontFamily: 'Noto Sans'
            }}>
            <p style={{ color: '#1c243d', opacity: '0.5', fontSize: '0.5em' }}>{lowerCase(key)}:</p>
            <p style={{ color: '#1c243d', fontSize: '1em', fontWeight: '300', margin: '10px 0px' }}>
              {highlighted && key === 'totalRainfall'
                ? <span>
                    <span style={{ opacity: '0.5', fontSize: '0.8em' }}>
                      {forecastTotals[key](highlighted.i + 1).toFixed(2)} /
                    </span> {this.renderTotal(key)}
                  </span>
                : this.renderTotal(key)}
            </p>
          </div>
        ))}
      </div>
    )
  }
}
