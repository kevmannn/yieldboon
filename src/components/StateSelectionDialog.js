import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import DoneIcon from 'material-ui-icons/Done';
import ErrorIcon from 'material-ui-icons/PriorityHigh';
import CachedIcon from 'material-ui-icons/Bookmark';
import { FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import * as selectors from '../selectors';
import { selectState } from '../actions';

class StateSelectionDialog extends PureComponent {
  static defaultProps = {
    history: PropTypes.object,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
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
  };

  iconStyle = {
    height: '20px',
    width: '20px',
    position: 'relative',
    top: '6px',
    opacity: '0.3'
  };

  theme = createMuiTheme({
    overrides: {
      MuiDialog: {
        paper: {
          width: '90%',
          maxHeight: '500px'
        }
      },
      MuiBackdrop: {
        root: {
          backgroundColor: 'rgba(7, 9, 15, 0.8)'
        }
      },
      MuiTypography: {
        title: {
          color: '#151b2d',
          fontFamily: 'Rubik'
        }
      },
      MuiIconButton: {
        root: {
          color: '#7795f8'
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
      MuiPaper: {
        root: {
          backgroundColor: '#fcfdff'
        }
      },
      MuiFormControlLabel: {
        label: {
          lineHeight: '25px',
          fontFamily: 'Rubik',
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
          enterTransitionDuration={270}
          leaveTransitionDuration={270}
          onBackdropClick={this.onCancel}
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
                  control={<Radio />}
                  label={
                    <p>{stateAbbr}
                      <span style={{ fontSize: '0.9em', opacity: '0.3' }}>
                        {` (${activeStates[stateAbbr].yieldTotal} bu) `}
                      </span>
                      {activeStates[stateAbbr].isCached
                        ? activeStates[stateAbbr].didError
                          ? <ErrorIcon style={{ ...this.iconStyle, color: '#ff4081' }} />
                          : <CachedIcon style={{ ...this.iconStyle, color: '#7795f8' }} />
                        : null}
                    </p>
                  } />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <IconButton style={{ opacity: '0.5' }} onClick={this.onCancel}>
              <CloseIcon />
            </IconButton>
            <IconButton onClick={this.onAccept}>
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

export default withRouter(connect(mapStateToProps, { selectState })(StateSelectionDialog));
