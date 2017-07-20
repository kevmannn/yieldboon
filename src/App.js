import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import './app.css';
import 'react-vis/dist/style.css';

import Toast from './Toast';
import Dashboard from './Dashboard';

class App extends Component {
  static propTypes = {
    // Provided via connect:
    selectedState: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      toastMessage: null,
      toastIsOpen: false
    }
  }

  onError = (message: toastMessage) => {
    this.setState({ toastMessage, toastIsOpen: true });
  };

  onRequestClose = () => {
    this.setState({ toastIsOpen: false });
  };

  render() {
    const { selectedState } = this.props;
    const { toastMessage, toastIsOpen } = this.state;
    return (
      <div>
        <Route path="/" render={(props) => (
          <Redirect to={`/dashboard/${selectedState}`} />
        )} />
        <Route
          exact
          path="/dashboard/:selectedState"
          render={(props) => (
            <Dashboard
              {...props}
              onError={this.onError} />
          )} />
        <Toast
          isOpen={toastIsOpen}
          message={toastMessage}
          onRequestClose={this.onRequestClose} />
      </div>
    )
  }
}

function mapStateToProps({ selectedState }) {
  return { selectedState };
}

export default connect(mapStateToProps)(App);
