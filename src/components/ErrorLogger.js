import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import Snackbar from 'material-ui/Snackbar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import * as selectors from '../selectors';

class ErrorLogger extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool,
    errorLogMessages: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: 'changing'
    }
  }

  componentWillReceiveProps({ isFetching, errorLogMessages }) {
    if (!isEqual(errorLogMessages, this.props.errorLogMessages)) {
      const len = errorLogMessages.length;
      this.setState({
        message: 
          <p style={{ fontSize: '0.8em' }}>
            Failed to load forecast{len > 1 ? 's' : ''} for
            <strong style={{ color: '#ff4081' }}>{` ${len}`}</strong> {`count${len > 1 ? 'ies' : 'y'}`}...
          </p>
      })
    } else if (!isFetching && this.props.errorLogMessages.length) {
      this.setState({ isOpen: true });
    }
  }

  onRequestClose = () => {
    this.setState({ isOpen: false });
  };

  theme = createMuiTheme({
    overrides: {
      MuiSnackbarContent: {
        root: {
          fontFamily: 'Noto Sans',
          color: '#fcfdff',
          backgroundColor: '#151b2d'
        }
      }
    }
  });

  render() {
    const { isOpen, message } = this.state;
    return (
      <MuiThemeProvider theme={this.theme}>
        <Snackbar
          open={isOpen}
          message={message}
          onRequestClose={this.onRequestClose} />
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: selectors.getIsFetching(state),
    errorLogMessages: selectors.getErrorLogMessages(state)
  }
}

export default connect(mapStateToProps)(ErrorLogger);
