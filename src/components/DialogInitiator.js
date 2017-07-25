import React, { PureComponent } from 'react';
import IconButton from 'material-ui/IconButton';
import SelectStateIcon from 'material-ui-icons/Mms';
import { MuiThemeProvider } from 'material-ui/styles';

import StateDialog from './StateDialog';

export default class DialogInitiator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false
    }
  }

  onClick = () => {
    this.setState({ dialogIsOpen: true });
  };

  onRequestClose = () => {
    this.setState({ dialogIsOpen: false });
  };

  render() {
    const { dialogIsOpen } = this.state;
    return (
      <div style={{ float: 'right', margin: '15px'  }}>
        <MuiThemeProvider>
          <IconButton color="accent" onClick={this.onClick}>
            <SelectStateIcon />
          </IconButton>
        </MuiThemeProvider>
        <StateDialog
          isOpen={dialogIsOpen}
          onRequestClose={this.onRequestClose} />
      </div>
    )
  }
}
