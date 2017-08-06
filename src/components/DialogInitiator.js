import React, { PureComponent } from 'react';
import IconButton from 'material-ui/IconButton';
import SelectStateIcon from 'material-ui-icons/Mms';

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
        <IconButton color="accent" onClick={this.onClick}>
          <SelectStateIcon />
        </IconButton>
        <StateDialog
          isOpen={dialogIsOpen}
          onRequestClose={this.onRequestClose} />
      </div>
    )
  }
}
