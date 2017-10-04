import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

// import * as selectors from '../selectors';
// import { narrowCounties } from '../actions';

export default class Search extends PureComponent {
  static propTypes = {
    terms: PropTypes.arrayOf(PropTypes.string)
  };

  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  onChange = ({ target: { value: input }}) => {
    this.setState({ input })
  };

  render() {
    const { input } = this.state
    return (
      <div style={{ padding: '20px' }}>
        <TextField
          value={input}
          onChange={this.onChange} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // input: selectors.getSearchInput(state)
  }
}

export default connect(mapStateToProps)(Search);
