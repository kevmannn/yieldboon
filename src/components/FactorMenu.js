import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import isEqual from 'lodash/isEqual';
import Menu, { MenuItem } from 'material-ui/Menu';
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import * as selectors from '../selectors';

class FactorMenu extends PureComponent {
  static propTypes = {};

  // shouldComponentUpdate(nextProps, nextState) {}

  render() {
    return (
      <div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedFactor: selectors.getSelectedFactor(state)
  }
}

export default connect(mapStateToProps)(FactorMenu);
