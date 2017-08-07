import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lowerCase from 'lodash/lowerCase';
import { Motion, spring, presets } from 'react-motion';
import SelectStateIcon from 'material-ui-icons/Mms';
import AboutIcon from 'material-ui-icons/Bookmark';

import ErrorLogger from './ErrorLogger';
import DialogInitiator from './DialogInitiator';
// import TimespanToggle from './TimespanToggle';

export default class ForecastSynopsis extends PureComponent {
  static propTypes = {
    highlighted: PropTypes.object,
    activeCounties: PropTypes.arrayOf(PropTypes.object),
    forecastTotals: PropTypes.shape({
      // timespan: PropTypes.array,
      selectedState: PropTypes.string,
      totalCounties: PropTypes.number,
      totalSoybeanYield: PropTypes.string,
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

  renderPartOfWhole(part, whole) {
    return (
      <Motion
        defaultStyle={{ opacity: 0, translation: 20 }}
        style={{ opacity: spring(1), translation: spring(0, { ...presets.stiff, precision: 1 }) }}>
        {({ opacity, translation }) => (
          <span style={{ opacity }}>
            <span style={{
              opacity,
              fontSize: '0.8em',
              transform: `translateX(${translation})px`
            }}>
              {part} /
            </span> {whole}
          </span>
        )}
      </Motion>
    )
  }

  render() {
    const { highlighted, forecastTotals, activeCounties = [] } = this.props;
    return (
      <div>
        {Object.keys(forecastTotals).reverse().map((key, i) => (
          <div
            key={i}
            style={{
              display: 'inline-block',
              width: '110px',
              padding: '5px 25px',
              fontFamily: 'Noto Sans'
            }}>
            <p style={{ color: '#1c243d', opacity: '0.5', fontSize: '0.5em' }}>{lowerCase(key)}:</p>
            <p style={{ color: '#1c243d', fontSize: '1em', fontWeight: '300', margin: '10px 0px' }}>
              {highlighted && key === 'totalRainfall'
                ? this.renderPartOfWhole(forecastTotals[key](highlighted.i + 1).toFixed(2), this.renderTotal(key))
                : key === 'totalCounties' && activeCounties.length !== forecastTotals[key]
                  ? this.renderPartOfWhole(forecastTotals[key], activeCounties.length)
                  : this.renderTotal(key)}
            </p>
          </div>
        ))}
        <DialogInitiator icon={<SelectStateIcon />} />
        <DialogInitiator isDisabled icon={<AboutIcon />} />
        <ErrorLogger />
      </div>
    )
  }
}
