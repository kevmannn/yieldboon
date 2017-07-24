import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import lowerCase from 'lodash/lowerCase';

// import FilterDialog from './FilterDialog';

export default class ForecastSynopsis extends PureComponent {
  static propTypes = {
    // errorLog: PropTypes.object,
    highlighted: PropTypes.object,
    forecastTotals: PropTypes.shape({
      // timespan: PropTypes.array,
      selectedState: PropTypes.string,
      totalCounties: PropTypes.number,
      totalSoybeanYield: PropTypes.number,
      totalRainfall: PropTypes.func
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
