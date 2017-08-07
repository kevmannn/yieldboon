import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import SelectStateIcon from 'material-ui-icons/Mms';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import StateDialog from './StateDialog';

export default class DialogInitiator extends PureComponent {
  static propTypes = {
    icon: PropTypes.node,
    isDisabled: PropTypes.bool,
    // color: PropTypes.string,
    // dialog: PropTypes.node.isRequired,
    isFullScreen: PropTypes.bool
  };

  static defaultProps = {
    icon: <SelectStateIcon />,
    isFullScreen: false
  };

  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false
    }
  }

  theme = createMuiTheme({
    overrides: {
      MuiIconButton: {
        root: {
          color: '#7795f8'
        }
      }
    }
  });

  onClick = () => {
    this.setState({ dialogIsOpen: true });
  };

  onRequestClose = () => {
    this.setState({ dialogIsOpen: false });
  };

  render() {
    const { icon: Icon, isDisabled } = this.props;
    const { dialogIsOpen } = this.state;
    return (
      <div style={{ float: 'right', margin: '15px'  }}>
        <MuiThemeProvider theme={this.theme}>
          <IconButton disabled={isDisabled} onClick={this.onClick}>
            {Icon}
          </IconButton>
        </MuiThemeProvider>
        <StateDialog
          isOpen={dialogIsOpen}
          onRequestClose={this.onRequestClose} />
      </div>
    )
  }
}
