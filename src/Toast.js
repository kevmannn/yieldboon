import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';
import Snackbar from 'material-ui/Snackbar';
import { MuiThemeProvider } from 'material-ui/styles';

export default class Toast extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.node,
    onRequestClose: PropTypes.func.isRequired
  };

  onRequestClose = () => {
    this.props.onRequestClose();
  };

  render() {
    const { isOpen, message } = this.props;
    return (
      <MuiThemeProvider>
        <Snackbar
          open={isOpen}
          message={message}
          onRequestClose={this.onRequestClose}
          transition={<Slide direction="up" />}
          autoHideDuration={4000} />
      </MuiThemeProvider>
    )
  }
}
