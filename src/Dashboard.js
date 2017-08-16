import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { List } from 'immutable';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

// import AsyncComponent from './components/AsyncComponent';
import * as selectors from './selectors';
import InitLoader from './components/InitLoader';
import CountyRegistry from './components/CountyRegistry';
import VisualizationDyad from './components/VisualizationDyad';
import { loadForecasts, selectState, fetchSoybeanProductionIfNeeded } from './actions';

class Dashboard extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // Provided via connect:
    selectedState: PropTypes.string.isRequired,
    payloadSubset: PropTypes.arrayOf(PropTypes.object).isRequired,
    didFailToFetch: PropTypes.bool,
    isFetchingCropData: PropTypes.bool
  };

  componentWillMount() {
    this.props.fetchSoybeanProductionIfNeeded();
  }

  componentWillReceiveProps({ match: { params }, selectedState, payloadSubset }) {
    // Make history "catch up to" a newly selected state (and vice versa)
    if (this.props.match.params.selectedState !== selectedState) {
      this.props.history.push(`/dashboard/${selectedState}`);
    } else if (params.selectedState !== selectedState) {
      this.props.selectState(params.selectedState);
    }
    // Fetch any necessary forecasts for the counties in the selectedState.
    if (payloadSubset.length !== this.props.payloadSubset.length) {
      this.props.loadForecasts(payloadSubset);
    }
  }

  render() {
    const { selectedState, isFetchingCropData, didFailToFetch } = this.props;
    return (
      didFailToFetch
        ? <div className="buffer error">Something went wrong...</div>
        : isFetchingCropData
          ? <InitLoader />
          : <Motion
              defaultStyle={{ opacty: 0 }}
              style={{ opacty: spring(1) }}>
              {({ opacty }) => (
                <div style={{ opacty }}>
                  <VisualizationDyad />
                  <CountyRegistry selectedState={selectedState} />
                </div>
              )}
            </Motion>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedState: selectors.getSelectedState(state),
    payloadSubset: selectors.getPayloadSubset(state),
    didFailToFetch: selectors.getDidFailToFetch(state),
    isFetchingCropData: selectors.getIsFetchingSoybeanProduction(state)
  }
}

export default connect(
  mapStateToProps,
  { loadForecasts, selectState, fetchSoybeanProductionIfNeeded }
)(Dashboard)
