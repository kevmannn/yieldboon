import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import Button from 'material-ui/Button';
// import { byAbbr, byName } from 'usps-states';
// import { MuiThemeProvider } from 'material-ui/styles';

// import FilterDialog from './FilterDialog';
// import YieldRheostat from './YieldRheostat';

export default class FilterBar extends PureComponent {
  static propTypes = {
    onSelectState: PropTypes.func.isRequired,
    selectedState: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  onRequestClose = (stateName = '') => {
    this.props.selectState(stateName);
    this.setState({ isOpen: false });
  };

  render() {
    // const { selectedState } = this.props;
    // const { isOpen } = this.state;
    return (
      <div>
        {/*<FilterDialog
          isOpen={isOpen}
          selectedValue={selectedState}
          onRequestClose={this.onRequestClose}></FilterDialog>*/}
      </div>
    )
  }
}
