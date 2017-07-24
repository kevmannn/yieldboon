import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import AsyncComponent from './components/AsyncComponent';
import * as selectors from './selectors';
// import CountyRegistry from './components/CountyRegistry';
import VisualizationDyad from './components/VisualizationDyad';
import { loadForecasts, fetchSoybeanProductionIfNeeded } from './actions';

class Dashboard extends PureComponent {
  static propTypes = {
    // match: PropTypes.object.isRequired,
    // Provided via connect:
    selectedState: PropTypes.string.isRequired,
    payloadSubset: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchSoybeanProductionIfNeeded: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchSoybeanProductionIfNeeded();
  }

  componentWillReceiveProps({ payloadSubset }) {
    // Fetch any necessary forecasts for the counties in the selectedState.
    if (payloadSubset.length !== this.props.payloadSubset.length) {
      this.props.loadForecasts(payloadSubset);
    }
  }

  render() {
    // const { selectedState } = this.props;
    return (
      <div>
        <VisualizationDyad />
        {/*<CountyRegistry selectedState={selectedState} />*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedState: selectors.getSelectedState(state),
    payloadSubset: selectors.getPayloadSubset(state)
  }
}

export default connect(
  mapStateToProps,
  { loadForecasts, fetchSoybeanProductionIfNeeded }
)(Dashboard)
