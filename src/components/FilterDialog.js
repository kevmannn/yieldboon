import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import { MuiThemeProvider } from 'material-ui/styles';
import { LabelRadio as Radio, RadioGroup } from 'material-ui/Radio';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import * as selectors from '../selectors';
import { selectState } from '../actions';

class FilterDialog extends PureComponent {
  static defaultProps = {
    history: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    // Provided via connect:
    activeStates: PropTypes.object.isRequired,
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
    const { onRequestClose, selectState, history } = this.props;
    // onRequestClose(selectedValue);
    // selectState(selectedValue);
    // history.push(`/dashboard/${selectedValue}`);
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

function mapStateToProps(state) {
  return {
    activeStates: selectors.getActiveStates(state)
  }
}

export withRouter(connect(mapStateToProps, { selectState })(FilterDialog));
