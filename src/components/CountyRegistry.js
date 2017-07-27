import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lowerCase from 'lodash/lowerCase';
import { connect } from 'react-redux';
import Table, {
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import * as selectors from '../selectors';
import { setForecastFilter } from '../actions';

class CountyRegistry extends PureComponent {
  static propTypes = {
    selectedState: PropTypes.string.isRequired,
    // Provided via connect:
    isFetching: PropTypes.bool,
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCountyIds: props.activeCounties.map(({ id }) => id)
    }
  }

  onChange = (id) => {
    console.log(id);
  };

  onSelectAll = () => {
    const selectedCountyIds = this.props.activeCounties.map(({ id }) => id);
    this.setState({ selectedCountyIds });
  };

  theme = createMuiTheme({
    overrides: {
      MuiTable: {
        root: {
          // height: '200px',
          // overflow: 'scroll'
        }
      },
      MuiTableHead: {
        root: {
          color: '#1c243d',
        }
      },
      MuiTableRow: {
        root: {
          fontFamily: 'Noto Sans',
          fontSize: '0.8em',
          color: '#151b2d'
        }
      },
      MuiCheckbox: {
        checked: {
          color: '#7795f8'
        },
        default: {
          color: '#7795f8'
        }
      }
    }
  });

  render() {
    const { isFetching, activeCounties } = this.props;
    // const { selectedCountyIds } = this.state;
    return (
      <div style={{
        margin: '10px',
        minHeight: '100px',
        display: 'block',
        padding: '10px',
        position: 'relative',
        boxShadow: '0 1px 3px 0 rgba(7, 9, 15, 0.3), 0 1px 1px 0 rgba(7, 9, 15, 0.14), 0 2px 1px -1px rgba(7, 9, 15, 0.2)'
      }}>
        {isFetching
          ? null
          : <MuiThemeProvider theme={this.theme}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell checkbox>
                    <Checkbox onChange={this.onSelectAll} />
                  </TableCell>
                  {!activeCounties.length
                    ? null
                    : Object.keys(activeCounties[0]).slice(1).map((key, i) => (
                        <TableCell key={i}>
                          {lowerCase(key)}
                        </TableCell>
                      ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {activeCounties.slice(0, 3).map(({ id, countyName, soybeanYield, totalRainfall }) => (
                  <TableRow
                    key={id}
                    selected={false}>
                    <TableCell checkbox>
                      <Checkbox
                        checked={false}
                        onChange={() => this.onChange(id)} />
                    </TableCell>
                    <TableCell>
                      {countyName}
                    </TableCell>
                    <TableCell>
                      {soybeanYield}
                    </TableCell>
                    <TableCell>
                      {totalRainfall}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </MuiThemeProvider>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: selectors.getIsFetching(state),
    activeCounties: selectors.getActiveCounties(state)
  }
}

export default connect(mapStateToProps, { setForecastFilter })(CountyRegistry);
