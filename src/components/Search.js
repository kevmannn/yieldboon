import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

export default class Search extends PureComponent {
  static propTypes = {
    searchInput: PropTypes.string
  };

  render() {
    return (
      <div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Search);
