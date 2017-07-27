import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import DoneIcon from 'material-ui-icons/Done';
import ErrorIcon from 'material-ui-icons/Error';
import CachedIcon from 'material-ui-icons/FlashOn';
import { FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
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
    selectedState: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.selectedState
    }
  }

  componentWillReceiveProps({ selectedState }) {
    if (selectedState !== this.state.selectedValue) {
      this.setState({ selectedValue: selectedState });
    }
  }

  radioGroup = null;

  onEntering = () => {
    this.radioGroup.focus();
  };

  onCancel = () => {
    const { onRequestClose, selectedState: selectedValue } = this.props;
    this.setState({ selectedValue });
    onRequestClose();
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

  iconStyle = {
    height: '20px',
    width: '20px',
    position: 'relative',
    top: '5px',
    opacity: '0.4'
  };

  theme = createMuiTheme({
    overrides: {
      MuiDialog: {
        paper: {
          width: '80%',
          maxHeight: '400px'
        }
      },
      MuiTypography: {
        title: {
          color: '#151b2d',
          fontFamily: 'Noto Sans'
        }
      },
      MuiRadio: {
        checked: {
          color: '#7795f8'
        },
        default: {
          color: '#151b2d'
        }
      },
      MuiFormControlLabel: {
        label: {
          lineHeight: '25px',
          fontFamily: 'Noto Sans',
          fontSize: '0.9em',
          color: '#151b2d'
        }
      }
    }
  });

  render() {
    const { isOpen, activeStates } = this.props;
    const { selectedValue } = this.state;
    return (
      <MuiThemeProvider theme={this.theme}>
        <Dialog
          open={isOpen}
          onEntering={this.onEntering}>
          <DialogTitle>Filter forecasts by state</DialogTitle>
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
                    <p>{stateAbbr}
                      <span style={{ opacity: '0.4' }}>
                        {` (${activeStates[stateAbbr].total} bu) `}
                      </span>
                      {activeStates[stateAbbr].isCached
                        ? activeStates[stateAbbr].didError
                          ? <ErrorIcon style={{...this.iconStyle, color: '#ff4081'}} />
                          : <CachedIcon style={{...this.iconStyle, color: '#7795f8'}} />
                        : null}
                    </p>
                  }
                  control={<Radio />} />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={this.onCancel}>
              <CloseIcon />
            </IconButton>
            <IconButton color="accent" onClick={this.onAccept}>
              <DoneIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeStates: selectors.getActiveStates(state),
    selectedState: selectors.getSelectedState(state)
  }
}

export default withRouter(connect(mapStateToProps, { selectState })(StateDialog));
