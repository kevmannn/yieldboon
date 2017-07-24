import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import './app.css';
import 'react-vis/dist/style.css';

// import Toast from './Toast';
import Dashboard from './Dashboard';
import * as selectors from './selectors';

class App extends Component {
  static propTypes = {
    selectedState: PropTypes.string
  };

  state = {
    toastMessage: null,
    toastIsOpen: false
  };

  // onRequestClose = () => {
  //   this.setState({ toastIsOpen: false });
  // };

  render() {
    const { selectedState } = this.props;
    // const { toastMessage, toastIsOpen } = this.state;
    return (
      <div>
        <Route path="/" render={(props) => (
          <Redirect to={`/dashboard/${selectedState}`} />
        )} />
        <Route
          exact
          path="/dashboard/:selectedState"
          render={(props) => (
            <Dashboard {...props} />
          )} />
        {/*<Toast
          isOpen={toastIsOpen}
          message={toastMessage}
          onRequestClose={this.onRequestClose} />*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedState: selectors.getSelectedState(state)
  }
}

export default connect(mapStateToProps)(App);
