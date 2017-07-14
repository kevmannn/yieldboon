import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { spring, presets, TransitionMotion } from 'react-motion';

import * as selectors from './selectors';
import FilterBar from './components/FilterBar';
import CountyRegistry from './components/CountyRegistry';
import VisualizationDyad from './components/VisualizationDyad';
import { loadForecasts, selectState, fetchSoybeanProductionIfNeeded } from './actions';

class Dashboard extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired,
    // Provided via connect:
    selectedState: PropTypes.string.isRequired,
    activePayloads: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchSoybeanProductionIfNeeded: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchSoybeanProductionIfNeeded();
  }

  // Make state 'catch up to' an incongruous path.
  componentWillReceiveProps({ match: { params }, activePayloads }) {
    const { loadForecasts, selectState, selectedState } = this.props;
    if (params.selectedState !== selectedState) {
      selectState(params.selectedState);
    }

    // if (activePayloads.length) {
    //   loadForecasts(activePayloads);
    // }
  }

  onSelectState = (selectedState) => {
    const { history, selectState } = this.props;
    selectState(selectedState);
    history.push(`/dashboard/${selectedState}`);
  };

  // springConfig = { ...presets.stiff, precision: 0.9 };

  // motionStyle = {
  //   opacity: spring(1, this.springConfig),
  //   translation: spring(0, this.springConfig)
  // };

  // willEnter = () => {
  //   return {
  //     opacity: 0.8,
  //     translation: -170
  //   }
  // };

  // willLeave = () => {
  //   return {
  //     opacity: spring(0, this.springConfig),
  //     translation: spring(40, this.springConfig)
  //   }
  // };

  render() {
    const { selectedState } = this.props;
    return (
      <div>
        <FilterBar
          selectedState={selectedState}
          onSelectState={this.onSelectState } />
        <CountyRegistry />
        <VisualizationDyad />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedState } = state;
  return {
    selectedState,
    activePayloads: selectors.getActivePayloads(state)
  }
}

export default connect(mapStateToProps, { loadForecasts, selectState, fetchSoybeanProductionIfNeeded })(Dashboard);
