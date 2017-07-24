import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import { MuiThemeProvider } from 'material-ui/styles';
import { FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import * as selectors from '../selectors';
import { selectState } from '../actions';

class StateDialog extends PureComponent {
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

  onCancel = () => {
    this.props.onRequestClose();
  };

  onAccept = () => {
    const { selectedValue } = this.state;
    const { onRequestClose, selectState, history } = this.props;
    onRequestClose();
    selectState(selectedValue);
    history.push(`/dashboard/${selectedValue}`);
  };

  onChange = (event, selectedValue) => {
    this.setState({ selectedValue });
  }

  render() {
    const { isOpen, activeStates, ...rest } = this.props;
    const { selectedValue } = this.state;
    return (
      <MuiThemeProvider>
        <Dialog
          {...rest}
          open={isOpen}
          onEntering={this.onEntering}>
          <DialogTitle>Select a state</DialogTitle>
          <DialogContent>
            <RadioGroup
              name="states"
              innerRef={node => { this.radioGroup = node }}
              selectedValue={selectedValue}
              onChange={this.onChange}>
              {Object.keys(activeStates).map((stateAbbr, i) => (
                <FormControlLabel
                  key={i}
                  value={stateAbbr}
                  label={
                    <p style={{ fontFamily: 'Noto Sans', fontSize: '0.8em', color: '#151b2d' }}>
                      {stateAbbr} <span style={{ opacity: '0.5' }}>
                        {`(${activeStates[stateAbbr]} bu)`}
                      </span>
                    </p>
                  }
                  control={<Radio />} />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button raised onClick={this.onCancel}>cancel</Button>
            <Button raised onClick={this.onAccept}>accept</Button>
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

export default withRouter(connect(mapStateToProps, { selectState })(StateDialog));
