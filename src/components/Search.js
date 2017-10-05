import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui-icons/Search';
import TextField from 'material-ui/TextField';
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

export default class Search extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    // label: PropTypes.string
  };

  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  onChange = ({ target: { value: input }}) => {
    this.setState({ input });
    this.props.onChange(input);
  };

  render() {
    const { input } = this.state;
    return (
      <div style={{ padding: '20px' }}>
        <TextField
          fullWidth
          value={input}
          label={<SearchIcon />}
          onChange={this.onChange} />
      </div>
    )
  }
}
