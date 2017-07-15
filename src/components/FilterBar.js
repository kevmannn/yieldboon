import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import Paper from 'material-ui/Paper';
// import Button from 'material-ui/Button';
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

  onClick = () => {};

  onRequestClose = (stateName = '') => {
    this.setState({ isOpen: false });
    this.props.onSelectState(stateName);
  };

  render() {
    // const { selectedState } = this.props;
    // const { isOpen } = this.state;
    return (
      <div style={{ display: 'block' }}>
        {/*<FilterDialog
          isOpen={isOpen}
          selectedState={selectedState}
          onRequestClose={this.onRequestClose}></FilterDialog>*/}
      </div>
    )
  }
}
