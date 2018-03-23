import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui-icons/Done';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

export default class AboutDialog extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func
  };

  theme = createMuiTheme({
    overrides: {
      MuiIconButton: {
        root: {
          color: '#7795f8'
        }
      },
      MuiDialog: {
        paper: {
          width: '90%',
          maxHeight: '500px'
        }
      },
      MuiDialogContent: {
        root: {
          fontSize: '0.9em'
        }
      },
      MuiBackdrop: {
        root: {
          backgroundColor: 'rgba(7, 9, 15, 0.8)'
        }
      }
    }
  });

  onCancel = () => {
    this.props.onRequestClose();
  };

  render() {
    const { isOpen } = this.props;
    return (
      <MuiThemeProvider theme={this.theme}>
        <Dialog
          open={isOpen}
          enterTransitionDuration={270}
          leaveTransitionDuration={270}
          onBackdropClick={this.onCancel}>
          <DialogTitle>About</DialogTitle>
          <DialogContent>
            <p>This is a service which aspires to correlate weather forecasts with crop success.</p>
            <p>Hovering over the chart presents hierarchical data for that time value.</p>
            <p>The code can be found{' '}
              <a href="https://github.com/kevmannn/yieldboon" rel="noopener noreferrer" target="_blank">here</a>.
            </p>
            <p>The forecast data is powered by{' '}
              <a href="https://darksky.net" rel="noopener noreferrer" target="_blank">darksky.net</a>.
            </p>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={this.onCancel}>
              <DoneIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}
