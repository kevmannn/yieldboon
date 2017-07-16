import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { data as uspsStates } from 'usps-states';
import Button from 'material-ui/Button';
import { MuiThemeProvider } from 'material-ui/styles';
import { LabelRadio as Radio, RadioGroup } from 'material-ui/Radio';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

export default class FilterDialog extends PureComponent {
  static defaultProps = {
    isOpen: PropTypes.bool.isRequired,
    selectedState: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null
    }
  }

  radioGroup = null;

  onEntering = () => {
    this.radioGroup.focus();
  };

  onCancel = () => {};

  onAccept = () => {
    const { selectedValue } = this.state;
    this.props.onRequestClose(selectedValue);
  };

  onChange = (event, selectedValue) => {
    this.setState({ selectedValue });
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <MuiThemeProvider>
        <Dialog
          {...rest}
          maxWidth="xs"
          ignoreEscapeKeyUp
          ignoreBackdropClick
          onEntering={this.onEntering}>
          <DialogTitle>Select a state</DialogTitle>
          <DialogContent
            innerRef={node => this.radioGroup = node}>
            <RadioGroup>
              {/*availableStates.map(({ abbr, name }) => (
                <Radio
                  key={abbr}
                  label={name}
                  value={abbr} />
              ))*/}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCancel}>cancel</Button>
            <Button onClick={this.onAccept}>accept</Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}
