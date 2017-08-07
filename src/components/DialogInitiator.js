import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import SelectStateDialog from './SelectStateDialog';

export default class DialogInitiator extends PureComponent {
  static propTypes = {
    icon: PropTypes.node,
    color: PropTypes.string,
    isFullScreen: PropTypes.bool
  };

  static defaultProps = {
    color: '#7795f8',
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
          color: this.props.color
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
    const { icon: Icon } = this.props;
    const { dialogIsOpen } = this.state;
    return (
      <div style={{ float: 'right', margin: '15px' }}>
        <MuiThemeProvider theme={this.theme}>
          <IconButton onClick={this.onClick}>
            {Icon}
          </IconButton>
        </MuiThemeProvider>
        <SelectStateDialog
          isOpen={dialogIsOpen}
          onRequestClose={this.onRequestClose} />
      </div>
    )
  }
}
