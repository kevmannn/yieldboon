import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Hint } from 'react-vis';
import { Motion, spring, presets } from 'react-motion';

export default class ForecastHint extends PureComponent {
  static propTypes = {
    value: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }).isRequired,
    // series: PropTypes.arrayOf(PropTypes.object).isRequired,
    primaryStroke: PropTypes.string.isRequired,
    secondaryStroke: PropTypes.string.isRequired,
    inclementForecasts: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  // shouldComponentUpdate(nextProps) {}

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

  render() {
    const { primaryStroke, secondaryStroke, series, inclementForecasts } = this.props;
    return (
      <div></div>
    )
  }
}
