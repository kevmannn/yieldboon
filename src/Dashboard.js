import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from './selectors';
// import CountyRegistry from './components/CountyRegistry';
// import AsyncComponent from './components/AsyncComponent';
import VisualizationDyad from './components/VisualizationDyad';
import { loadForecasts, selectState, fetchSoybeanProductionIfNeeded } from './actions';

class Dashboard extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired,
    // Provided via connect:
    selectedState: PropTypes.string.isRequired,
    payloadSubset: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchSoybeanProductionIfNeeded: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchSoybeanProductionIfNeeded();
  }

  componentWillReceiveProps({ match: { params }, payloadSubset }) {
    // Make state 'catch up to' an incongruous path.
    if (params.selectedState !== this.props.selectedState) {
      this.props.selectState(params.selectedState);
    }

    // Fetch any necessary forecasts for the counties in the selectedState.
    if (payloadSubset.length) {
      this.props.loadForecasts(payloadSubset);
    }
  }

  onSelectState = (selectedState) => {
    const { history, selectState } = this.props;
    selectState(selectedState);
    history.push(`/dashboard/${selectedState}`);
  };

  render() {
    // const { selectedState } = this.props;
    return (
      <div>
        <VisualizationDyad />
        {/*<CountyRegistry
          selectedState={selectedState}
          onSelectState={this.onSelectState } />*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedState } = state;
  return {
    selectedState,
    payloadSubset: selectors.getPayloadSubset(state)
  }
}

export default connect(mapStateToProps, { loadForecasts, selectState, fetchSoybeanProductionIfNeeded })(Dashboard);
