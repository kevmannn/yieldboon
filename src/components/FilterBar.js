import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
// import IconButton from 'material-ui/IconButton';
// import FilterListIcon from 'material-ui-icons/FilterList';

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

  onClick = () => {
    this.setState({ isOpen: true });
  };

  onRequestClose = (stateName = '') => {
    this.setState({ isOpen: false });
    this.props.onSelectState(stateName);
  };

  render() {
    const { selectedState } = this.props;
    // const { isOpen } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <Toolbar>
            <Button onClick={this.onClick}>{selectedState}</Button>
          </Toolbar>
        </MuiThemeProvider>
        {/*<FilterDialog
          isOpen={isOpen}
          selectedState={selectedState}
          onRequestClose={this.onRequestClose}></FilterDialog>*/}
      </div>
    )
  }
}
