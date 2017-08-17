import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

export default class DialogInitiator extends Component {
  static propTypes = {
    icon: PropTypes.node,
    dialog: PropTypes.node.isRequired,
    iconColor: PropTypes.string
  };

  static defaultProps = {
    iconColor: '#7795f8'
  };

  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false
    }
  }

  shouldComponentUpdate(nextProps, { dialogIsOpen }) {
    return dialogIsOpen !== this.state.dialogIsOpen;
  }

  theme = createMuiTheme({
    overrides: {
      MuiIconButton: {
        root: {
          color: this.props.iconColor,
          width: '30px',
          height: '30px'
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
    const { icon: Icon, dialog } = this.props;
    const { dialogIsOpen } = this.state;
    return (
      <div style={{ float: 'right', margin: '15px' }}>
        <MuiThemeProvider theme={this.theme}>
          <IconButton onClick={this.onClick}>
            {Icon}
          </IconButton>
        </MuiThemeProvider>
        {React.cloneElement(dialog, {
          isOpen: dialogIsOpen,
          onRequestClose: this.onRequestClose
        })}
      </div>
    )
  }
}
