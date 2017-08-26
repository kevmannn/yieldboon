import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
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
import ForecastSeries from './ForecastSeries';

class CountyRegistry extends PureComponent {
  static propTypes = {
    selectedState: PropTypes.string.isRequired,
    // Provided via connect:
    isFetching: PropTypes.bool,
    disallowedIds: PropTypes.instanceOf(List),
    selectedFactor: PropTypes.object.isRequired,
    seriesExtremes: PropTypes.arrayOf(PropTypes.number),
    activeCounties: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      countyName: PropTypes.string,
      cropYield: PropTypes.string,
      chartedValueTotal: PropTypes.string,
      chartedValueSeries: PropTypes.arrayOf(PropTypes.object)
    })).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      didCheckAll: true
    }
  }

  getOpacityForTableCell(id) {
    return this.props.disallowedIds.includes(id) ? '0.1' : '1';
  }

  onChange = (id, isChecked) => {
    this.props.setForecastFilter({
      [`${isChecked ? 'revealed' : 'hidden' }Ids`]: [id]
    })
  };

  onSelectAll = (event, isChecked) => {
    const { setForecastFilter, activeCounties } = this.props;
    this.setState({ didCheckAll: isChecked });
    setForecastFilter({
      [`${isChecked ? 'revealed' : 'hidden' }Ids`]: activeCounties.map(({ id }) => id)
    })
  };

  theme = createMuiTheme({
    overrides: {
      MuiTableHead: {
        root: {
          background: '#f7f7f9',
          fontSize: '0.55em'
        }
      },
      MuiTableRow: {
        root: {
          fontFamily: 'Rubik',
          fontSize: '0.95em',
          color: '#151b2d'
        }
      },
      MuiTableCell: {
        root: {
          borderBottom: '1px solid rgba(7, 9, 15, 0.05)'
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
    const {
      isFetching,
      activeCounties,
      seriesExtremes,
      selectedFactor: { name: factorName },
      disallowedIds
    } = this.props;
    const { didCheckAll } = this.state;
    return (
      <div style={{
        margin: '10px',
        minHeight: '120px',
        maxHeight: '297px',
        overflow: 'auto',
        boxShadow: '0 1px 3px 0 rgba(7, 9, 15, 0.3), 0 1px 1px 0 rgba(7, 9, 15, 0.14), 0 2px 1px -1px rgba(7, 9, 15, 0.2)'
      }}>
        {isFetching || !activeCounties.length
          ? null
          : <MuiThemeProvider theme={this.theme}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell checkbox>
                      <Checkbox
                        checked={didCheckAll}
                        onChange={this.onSelectAll} />
                    </TableCell>
                    {Object.keys(activeCounties[0]).slice(1).map((key, i) => (
                      <TableCell style={{ color: '#242f4f' }} key={i}>
                        {lowerCase(key.replace(/chartedValue/, factorName))}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeCounties.map(({ id, countyName, cropYield, chartedValueTotal, chartedValueSeries }) => (
                    <TableRow key={id}>
                      <TableCell checkbox>
                        <Checkbox
                          checked={!disallowedIds.includes(id)}
                          onChange={(event, isChecked) => this.onChange(id, isChecked)} />
                      </TableCell>
                      <TableCell style={{ opacity: this.getOpacityForTableCell(id) }}>
                        <span>{countyName}</span>
                      </TableCell>
                      <TableCell style={{ fontSize: '1.25em', opacity: this.getOpacityForTableCell(id) }}>
                        <span>{cropYield}</span>
                      </TableCell>
                      <TableCell style={{ fontSize: '1.25em', opacity: this.getOpacityForTableCell(id) }}>
                        <span>{chartedValueTotal}</span>
                      </TableCell>
                      <TableCell style={{ opacity: this.getOpacityForTableCell(id) }}>
                        <ForecastSeries
                          series={chartedValueSeries}
                          seriesExtremes={seriesExtremes} />
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

function mapStateToProps(state, ownProps) {
  return {
    isFetching: selectors.getIsFetching(state),
    disallowedIds: selectors.getDisallowedIds(state),
    selectedFactor: selectors.getSelectedFactor(state),
    seriesExtremes: selectors.getSeriesExtremes(state),
    activeCounties: selectors.getActiveCounties(state)
  }
}

export default connect(mapStateToProps, { setForecastFilter })(CountyRegistry);
