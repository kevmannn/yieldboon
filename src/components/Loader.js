import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

export default class Loader extends PureComponent {
  static propTypes = {
    color: PropTypes.string
  };

  static defaultProps = {
    color: '#7795f8'
  }

  theme = createMuiTheme({
    overrides: {
      MuiCircularProgress: {
        circle: {
          color: this.props.color,
          opacity: '0.8'
        }
      }
    }
  });

  render() {
    return (
      <div style={{ textAlign: 'center', margin: '0px auto', padding: '100px' }}>
        <MuiThemeProvider theme={this.theme}>
          <CircularProgress size={140} />
        </MuiThemeProvider>
      </div>
    )
  }
}
