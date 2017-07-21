import React, { PureComponent } from 'react';
// import moment from 'moment';
import PropTypes from 'prop-types';

export default class ForecastScorecard extends PureComponent {
  static propTypes = {
    highlighted: PropTypes.object,
    forecastTotals: PropTypes.object.isRequired
  };

  render() {
    // const { forecastTotals } = this.props;
    return (
      <div>
      </div>
    )
  }
}
