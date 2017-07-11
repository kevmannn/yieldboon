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
    // provided via connect:
    selectedState: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      toast: {
        message: null,
        isOpen: false
      }
    }
  }

  onError = (message) => {
    const toast = { message, isOpen: true };
    this.setState({ toast });
  };

  onRequestClose = () => {
    this.setState({ toast: { isOpen: false } });
  };

  render() {
    const { selectedState } = this.props;
    const { toast: { message, isOpen } } = this.state;
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
          isOpen={isOpen}
          message={message}
          onRequestClose={this.onRequestClose} />
      </div>
    )
  }
}

function mapStateToProps({ selectedState }) {
  return { selectedState };
}

export default connect(mapStateToProps)(App);
