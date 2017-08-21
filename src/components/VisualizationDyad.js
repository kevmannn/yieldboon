import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import immutable from 'seamless-immutable';

import ForecastSynopsis from './ForecastSynopsis';
import ForecastChart from './ForecastChart';
import * as selectors from '../selectors';
// import { updateHighlighted } from '../actions';

class VisualizationDyad extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool,
    seriesExtremes: PropTypes.array.isRequired,
    forecastTotals: PropTypes.object.isRequired,
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedFactor: PropTypes.shape({
      name: PropTypes.string,
      unitOfMeasure: PropTypes.string
    }).isRequired,
    inclementForecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
    aggregateActiveForecastSeries: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    }
  }

  onNearestX = (highlighted = {}) => {
    this.setState({ highlighted });
    // this.props.updateHighlighted(highlighted);
  };

  render() {
    const { highlighted } = this.state;
    const {
      isFetching,
      seriesExtremes,
      forecastTotals,
      activeCounties,
      selectedFactor,
      inclementForecasts,
      aggregateActiveForecastSeries
    } = this.props;
    return (
      <div style={{
        margin: '10px',
        boxShadow: '0 1px 3px 0 rgba(7, 9, 15, 0.3), 0 1px 1px 0 rgba(7, 9, 15, 0.14), 0 2px 1px -1px rgba(7, 9, 15, 0.2)'
      }}>
        <ForecastSynopsis
          isFetching={isFetching || !activeCounties.length}
          highlighted={highlighted}
          selectedFactor={selectedFactor}
          activeCounties={activeCounties}
          forecastTotals={forecastTotals} />
        <ForecastChart
          isFetching={isFetching || !activeCounties.length}
          highlighted={highlighted}
          onNearestX={this.onNearestX}
          selectedFactor={selectedFactor}
          seriesExtremes={seriesExtremes}
          inclementForecasts={inclementForecasts}
          aggregateActiveForecastSeries={immutable(aggregateActiveForecastSeries)} />
      </div>
    )
  }
}

// TODO: pass ownProps to forecastTotals (for the sake of communicating the selectedFactor)?
function mapStateToProps(state) {
  return {
    isFetching: selectors.getIsFetching(state),
    seriesExtremes: selectors.getSeriesExtremes(state),
    forecastTotals: selectors.getForecastTotals(state),
    activeCounties: selectors.getActiveCounties(state),
    selectedFactor: selectors.getSelectedFactor(state),
    inclementForecasts: selectors.getInclementForecasts(state),
    aggregateActiveForecastSeries: selectors.getAggregateActiveForecastSeries(state)
  }  
}

export default connect(mapStateToProps)(VisualizationDyad);
