import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from './selectors';
import InitLoader from './components/InitLoader';
import CountyRegistry from './components/CountyRegistry';
import VisualizationTriad from './components/VisualizationTriad';
import { loadForecasts, selectState, fetchCropYieldIfNeeded } from './actions';

class Dashboard extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // Provided via connect:
    selectedState: PropTypes.string.isRequired,
    payloadSubset: PropTypes.arrayOf(PropTypes.object).isRequired,
    didFailToFetch: PropTypes.bool,
    isFetchingCropYield: PropTypes.bool
  };

  componentWillMount() {
    this.props.fetchCropYieldIfNeeded();
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
    const { selectedState, isFetchingCropYield, didFailToFetch } = this.props;
    return (
      didFailToFetch
        ? <div className="buffer error">Something went wrong...</div>
        : isFetchingCropYield
          ? <InitLoader />
          : <div>
              <VisualizationTriad />
              <CountyRegistry selectedState={selectedState} />
            </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedState: selectors.getSelectedState(state),
    payloadSubset: selectors.getPayloadSubset(state),
    didFailToFetch: selectors.getDidFailToFetch(state),
    isFetchingCropYield: selectors.getIsFetchingCropYield(state)
  }
}

export default connect(
  mapStateToProps,
  { loadForecasts, selectState, fetchCropYieldIfNeeded }
)(Dashboard)
