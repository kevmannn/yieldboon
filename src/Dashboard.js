import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import nprogress from 'nprogress';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
// import { spring, presets, TransitionMotion } from 'react-motion';

import FilterBar from './components/FilterBar';
import CountyRegistry from './components/CountyRegistry';
import VisualizationDyad from './components/VisualizationDyad';
// import * as selectors from './selectors';
import { selectState, fetchSoybeanProductionIfNeeded } from './actions';

class Dashboard extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired,
    // Provided via connect:
    selectedState: PropTypes.string.isRequired,
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchSoybeanProductionIfNeeded: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchSoybeanProductionIfNeeded();
  }

  // Make state 'catch up to' an incongruous path.
  componentWillReceiveProps({ match: { params } }) {
    const { history, selectState, selectedState } = this.props;
    if (params.selectedState !== selectedState) {
      selectState(params.selectedState);
    }
  }

  componentWillUpdate({ activeCounties }) {
    if (!activeCounties.length) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }

  onSelectedStateChange = (selectedState) => {
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
    const { selectedState, activeCounties } = this.props;
    return (
      <div>
        {/*<TransitionMotion
          styles={[{ key: uniqueId(), style: this.motionStyle }]}
          willEnter={this.willEnter}
          willLeave={this.willLeave}>
          {(interpolated) => (
            <div>
              {interpolated.map(({ key, style: { opacity, translation } }) => (
                <div></div>
              ))}
            </div>
          )}
        </TransitionMotion>*/}
        <FilterBar
          selectedState={selectedState}
          onSelectedStateChange={this.onSelectedStateChange }/>
        <CountyRegistry activeCounties={activeCounties} />
        <VisualizationDyad activeCounties={activeCounties} />
      </div>
    )
  }
}

const getSelectedState = ({ selectedState }) => selectedState;
const getSoybeanYieldBounds = ({ soybeanYieldBounds }) => soybeanYieldBounds;
const getSoybeanProductionPayload = ({ soybeanProduction: { payload } }) => payload;

// Filter soybeanProduction payload for entities that fall within our criteria of state membership and yield bounds.
const getActiveCounties = createSelector(
  [getSelectedState, getSoybeanYieldBounds, getSoybeanProductionPayload],
  (selectedState = '', { lowerbound = 0, upperbound = 1e8 }, payload = []) => (
    payload.filter(({ stateAbbr: abbr, soybeanYield: soy }) => {
      return abbr === selectedState && (soy > lowerbound && soy < upperbound);
    })
  )
)

// TODO: ...
// const getPrecipForecastCountyPayloadPairs = createSelector(
//   [getActiveCounties, getPrecipForecasts],
//   () => {}
// )

function mapStateToProps(state) {
  const { selectedState } = state;
  return {
    selectedState,
    activeCounties: getActiveCounties(state)
  }
}

export default connect(mapStateToProps, { selectState, fetchSoybeanProductionIfNeeded })(Dashboard);
