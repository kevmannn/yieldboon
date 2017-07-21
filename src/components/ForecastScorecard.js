import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ForecastScorecard extends PureComponent {
  static propTypes = {
    highlighted: PropTypes.object,
    forecastTotals: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
      </div>
    )
  }
}
