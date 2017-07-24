import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { MuiThemeProvider } from 'material-ui/styles';

import StateDialog from './StateDialog';

export default class DialogInitiator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false
    }
  }

  onClick = () => {};

  onRequestClose = () => {};

  render() {
    const { dialogIsOpen } = this.state;
    return (
      <MuiThemeProvider>
        <Button onClick={this.onClick}>Select a state</Button>
        <StateDialog
          isOpen={dialogIsOpen}
          onRequestClose={this.onRequestClose} />
      </MuiThemeProvider>
    )
  }
}
