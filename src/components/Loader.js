import React, { PureComponent } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

export default class Loader extends PureComponent {
  render() {
    return (
      <MuiThemeProvider>
        <CircularProgress size={40} />
      </MuiThemeProvider>
    )
  }
}
