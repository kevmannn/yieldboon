import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import Snackbar from 'material-ui/Snackbar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import * as selectors from '../selectors';

class ErrorLogger extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    didReachReqLimit: PropTypes.bool,
    errorLogMessages: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: 'changing'
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  // TODO: didReachReqLimit implementation
  componentWillReceiveProps({ isFetching, errorLogMessages }) {
    if (!isEqual(errorLogMessages, this.props.errorLogMessages)) {
      const len = errorLogMessages.length;
      const message = 
        <p style={{ fontSize: '0.8em' }}>
          Failed to load forecast{len > 1 ? 's' : ''} for
          <strong style={{ color: '#ff4081' }}>{` ${len}`}</strong> {`count${len > 1 ? 'ies' : 'y'}`}...
        </p>
      this.setState({ message });
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
          fontFamily: 'Rubik',
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
    didReachReqLimit: selectors.getDidReachReqLimit(state),
    errorLogMessages: selectors.getErrorLogMessages(state)
  }
}

export default connect(mapStateToProps)(ErrorLogger);
