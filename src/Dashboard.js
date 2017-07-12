import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import nprogress from 'nprogress';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
// import { spring, presets, TransitionMotion } from 'react-motion';

import FilterBar from './components/FilterBar';
import CountyRegistry from './components/CountyRegistry';
import VisualizationDyad from './components/VisualizationDyad';
import { fetchSoybeanProductionIfNeeded } from './actions';

class Dashboard extends PureComponent {
  static propTypes = {
    // match: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired,
    // Provided via connect:
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchSoybeanProductionIfNeeded: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchSoybeanProductionIfNeeded();
  }

  // TODO: Account for a route that is 'ahead of' state(?)
  componentWillReceiveProps({ match: { params } }) {
    // const { history, selectState, selectedState } = this.props;
    // if (params.selectedState !== selectedState) {
    //   selectState(params.selectedState);
    // }
  }

  // TODO: What if this does not, in fact, indicate that we are waiting for the cache,
  // and instead that there simply are no activeCounties to show??
  componentWillUpdate({ activeCounties }) {
    if (!activeCounties.length) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }

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
    const { activeCounties } = this.props;
    return (
      <div>
        {/*<TransitionMotion
          style={{}}
          willEnter={this.willEnter}
          willLeave={this.willLeave}>
          {(interpolated) => (
            <div></div>
          )}
        </TransitionMotion>*/}
        <FilterBar />
        <CountyRegistry activeCounties={activeCounties} />
        <VisualizationDyad activeCounties={activeCounties} />
      </div>
    )
  }
}

const getSelectedState = ({ selectedState }) => selectedState;
const getSoybeanYieldBounds = ({ soybeanYieldBounds }) => soybeanYieldBounds;
const getSoybeanProductionPayload = ({ soybeanProduction: { payload } }) => payload;

// Filter soybeanProduction payload for entries that fall within our criteria of state membership and yield bounds.
const getActiveCounties = createSelector(
  [getSelectedState, getSoybeanYieldBounds, getSoybeanProductionPayload],
  (selectedState = '', { lowerbound = 0, upperbound = 1e8 }, payload = []) => (
    payload.filter(({ stateAbbr: abbr, soybeanYield: soy }) => {
      return abbr === selectedState && (soy > lowerbound && soy < upperbound);
    })
  )
)

function mapStateToProps(state) {
  return { activeCounties: getActiveCounties(state) };
}

export default connect(mapStateToProps, { fetchSoybeanProductionIfNeeded })(Dashboard);
