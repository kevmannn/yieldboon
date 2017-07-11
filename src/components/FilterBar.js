import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { byAbbr, byName } from 'usps-states';
// import Button from 'material-ui/Button';

// import FilterDialog from './FilterDialog';
// import YieldRheostat from './YieldRheostat';
import { selectState, changeSoybeanYieldBounds } from '../actions';

class FilterBar extends PureComponent {
  static propTypes = {
    selectState: PropTypes.func.isRequired,
    changeSoybeanYieldBounds: PropTypes.func.isRequired,
    selectedState: PropTypes.string.isRequired,
    soybeanYieldBounds: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      dialog: {
        isOpen: false
      }
    }
  }

  render() {
    return (
      <div>
        {/*<FilterDialog isOpen={} />*/}
      </div>
    )
  }
}

function mapStateToProps({ selectedState, soybeanYieldBounds }) {
  return { selectedState, soybeanYieldBounds };
}

export default connect(mapStateToProps, { selectState, changeSoybeanYieldBounds })(FilterBar);
