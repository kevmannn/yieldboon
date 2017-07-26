import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import Snackbar from 'material-ui/Snackbar';
import { MuiThemeProvider } from 'material-ui/styles';

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
      message: ''
    }
  }

  componentWillReceiveProps({ isFetching, errorLogMessages }) {
    if (!isEqual(errorLogMessages, this.props.errorLogMessages)) {
      this.setState({
        message: 
          <p style={{ fontSize: '0.8em', fontFamily: 'Noto Sans' }}>
            Failed to load <strong style={{ color: '#ff4081' }}>{errorLogMessages.length}</strong> forecasts...
          </p>
      })
    } else if (!isFetching && this.props.errorLogMessages.length) {
      this.setState({ isOpen: true });
    }
  }

  onRequestClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, message } = this.state;
    return (
      <MuiThemeProvider>
        <Snackbar
          open={isOpen}
          message={message}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
