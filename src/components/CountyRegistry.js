import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lowerCase from 'lodash/lowerCase';
import { connect } from 'react-redux';
// import { Motion, spring, presets } from 'react-motion';
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
    disallowedIds: PropTypes.arrayOf(PropTypes.string),
    seriesExtremes: PropTypes.arrayOf(PropTypes.number),
    activeCounties: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      countyName: PropTypes.string,
      soybeanYield: PropTypes.string,
      totalRainfall: PropTypes.string,
      rainfallIntensity: PropTypes.arrayOf(PropTypes.object)
    })).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      didCheckAll: true
    }
  }

  getOpacityForTableCell(id) {
    return this.props.disallowedIds.includes(id) ? '0.2' : '1';
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
          fontSize: '0.6em'
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
    const { isFetching, activeCounties, seriesExtremes, disallowedIds = [] } = this.props;
    const { didCheckAll } = this.state;
    return (
      <div style={{
        margin: '10px',
        minHeight: '100px',
        maxHeight: '240px',
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
                        {lowerCase(key)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeCounties.map(({ id, countyName, soybeanYield, totalRainfall, rainfallIntensity }) => (
                    <TableRow key={id}>
                      <TableCell checkbox>
                        <Checkbox
                          checked={!disallowedIds.includes(id)}
                          onChange={(event, isChecked) => this.onChange(id, isChecked)} />
                      </TableCell>
                      <TableCell style={{ opacity: this.getOpacityForTableCell(id) }}>
                        <span>{countyName}</span>
                      </TableCell>
                      <TableCell style={{ opacity: this.getOpacityForTableCell(id) }}>
                        <span>{soybeanYield}</span>
                      </TableCell>
                      <TableCell style={{ opacity: this.getOpacityForTableCell(id) }}>
                        <span>{totalRainfall}</span>
                      </TableCell>
                      <TableCell style={{ opacity: this.getOpacityForTableCell(id) }}>
                        <ForecastSeries
                          series={rainfallIntensity}
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
    seriesExtremes: selectors.getSeriesExtremes(state),
    activeCounties: selectors.getActiveCounties(state)
  }
}

export default connect(mapStateToProps, { setForecastFilter })(CountyRegistry);
