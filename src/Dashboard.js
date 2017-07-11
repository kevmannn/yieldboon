import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import nprogress from 'nprogress';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import FilterBar from './components/FilterBar';
import VisualizationDyad from './components/VisualizationDyad';
// import ActiveCountyTable from './components/ActiveCountyTable';
import { fetchSoybeanProductionIfNeeded } from './actions';

class Dashboard extends PureComponent {
  static propTypes = {
    // match: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired,
    // provided via connect:
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchSoybeanProductionIfNeeded: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchSoybeanProductionIfNeeded();
  }

  // TODO: Account for a route that is 'ahead of' state(?)
  componentWillReceiveProps({ match: { params } }) {}

  // TODO: What if this does not, in fact, indicate that we are waiting for the cache,
  // and instead that there simply are no activeCounties to show??
  componentWillUpdate({ activeCounties }) {
    // console.log(activeCounties);
    if (!activeCounties.length) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }

  render() {
    const { activeCounties } = this.props;
    return (
      <div>
        <FilterBar />
        {/*<ActiveCountyTable activeCounties={activeCounties} />*/}
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
