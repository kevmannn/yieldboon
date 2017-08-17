import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import lowerCase from 'lodash/lowerCase';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import FactorMenuIcon from 'material-ui-icons/Assessment';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import * as selectors from '../selectors';
import { selectFactor } from '../actions'

class FactorMenu extends Component {
  static propTypes = {
    selectedFactor: PropTypes.shape({ name: PropTypes.string }).isRequired,
    availableFactors: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor() {
    super();
    this.state = {
      isOpen: false,
      anchorEl: null
    }
  }

  shouldComponentUpdate(nextProps, { isOpen }) {
    return isOpen !== this.state.isOpen || !isEqual(nextProps, this.props);
  }

  onIconButtonClick = ({ currentTarget: anchorEl }) => {
    this.setState({ isOpen: true, anchorEl });
  };

  onMenuItemClick = (factorName) => {
    this.setState({ isOpen: false });
    this.props.selectFactor(factorName);
  };

  onMenuClose = () => {
    this.setState({ isOpen: false });
  };

  theme = createMuiTheme({
    overrides: {
      MuiIconButton: {
        root: {
          color: '#7795f8',
          width: '30px',
          height: '30px'
        }
      },
      MuiMenu: {
        root: {
          backgroundColor: '#fcfdff'
        }
      },
      MuiMenuItem: {
        root: {
          fontFamily: 'Rubik',
          fontSize: '1.2em',
          color: '#1c243d'
        },
        selected: {
          backgroundColor: 'rgba(7, 9, 15, 0.05)'
        }
      }
    }
  });

  render() {
    const { availableFactors, selectedFactor } = this.props;
    const { isOpen, anchorEl } = this.state;
    return (
      <div style={{ float: 'right', margin: '15px' }}>
        <MuiThemeProvider theme={this.theme}>
          <div>
            <IconButton
              onClick={this.onIconButtonClick}>
              <FactorMenuIcon />
            </IconButton>
            <Menu
              open={isOpen}
              anchorEl={anchorEl}
              onRequestClose={this.onMenuClose}
              MenuListProps={{ style: { width: 200 } }}>
                {availableFactors.map(({ name }) => (
                  <MenuItem
                    key={name}
                    selected={name === selectedFactor.name}
                    onClick={() => this.onMenuItemClick(name)}>
                    {lowerCase(name)}
                  </MenuItem>
                ))}
            </Menu>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedFactor: selectors.getSelectedFactor(state),
    availableFactors: selectors.getAvailableFactors(state)
  }
}

export default connect(mapStateToProps, { selectFactor })(FactorMenu);
