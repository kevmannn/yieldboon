import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import Button from 'material-ui/Button';
// import List, { ListItem, ListItemText } from 'material-ui/List';
// import { MuiThemeProvider } from 'material-ui/styles';
// import { LabelRadio as Radio, RadioGroup } from 'material-ui/Radio';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

export default class FilterDialog extends PureComponent {
  static defaultProps = {
    isOpen: PropTypes.bool.isRequired,
    // onRequestClose: PropTypes.func.isRequired
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {}
  // }

  onEntering = () => {};

  render() {
    const { selectedValue, children, ...rest } = this.props;
    return (
      <Dialog
        {...rest}
        maxWidth="xs"
        ignoreEscapeKeyUp
        ignoreBackdropClick
        onEntering={this.onEntering}>
        {/*children*/}
      </Dialog>
    )
  }
}
