import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

export default class Loader extends PureComponent {
  static propTypes = {
    color: PropTypes.string
  };

  static defaultProps = {
    color: '#bdccfc'
  }

  theme = createMuiTheme({
    overrides: {
      MuiCircularProgress: {
        circle: {
          color: this.props.color
        }
      }
    }
  });

  render() {
    return (
      <div style={{ textAlign: 'center', margin: '0px auto', padding: '100px' }}>
        <MuiThemeProvider theme={this.theme}>
          <CircularProgress size={150} />
        </MuiThemeProvider>
      </div>
    )
  }
}
