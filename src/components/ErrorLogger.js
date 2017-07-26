import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import isEqual from 'lodash/isEqual';
// import moment from 'moment';
import Snackbar from 'material-ui/Snackbar';
import { MuiThemeProvider } from 'material-ui/styles';

import * as selectors from '../selectors';

class ErrorLogger extends PureComponent {
  static propTypes = {
    errorLogMessages: PropTypes.arrayOf(PropTypes.string)
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: null
    }
  }

  componentWillReceiveProps({ errorLogMessages }) {}

  onRequestClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { errorLogMessages } = this.props;
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
    errorLogMessages: selectors.getErrorLogMessages(state)
  }
}

export default connect(mapStateToProps)(ErrorLogger);
