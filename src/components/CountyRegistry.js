import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table, {
  TableRow,
  TableBody,
  TableCell,
  // TableHead,
  // TableSortLabel,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import { MuiThemeProvider } from 'material-ui/styles';
// import { withStyles, createStyleSheet } from 'material-ui/styles';

// import FilterBar from './FilterBar';
import * as selectors from '../selectors';
import { setForecastFilter } from '../actions';

class CountyRegistry extends PureComponent {
  static propTypes = {
    selectedState: PropTypes.string.isRequired,
    onSelectState: PropTypes.func.isRequired,
    // Provided via connect:
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  componentDidUpdate() {
    // console.log(this.props);
  }

  onSelectState = (state) => {
    this.props.onSelectState(state);
  };

  onClick = () => {};

  render() {
    const { activeCounties } = this.props;
    return (
      <div style={{ padding: '40px' }}>
        <MuiThemeProvider>
          <Paper>
            <Table>
              <TableBody>
                {activeCounties.map(({ countyName, isFetching, soybeanYield, totalRainfall }, i) => (
                  isFetching
                    ? <div>...loading</div>
                    : <TableRow
                        hover
                        key={i}
                        onClick={this.onClick}
                        selected={false}>
                      <TableCell checkbox>
                        <Checkbox checked={true} />
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
                      <TableCell>
                        {(soybeanYield / totalRainfall).toFixed(3)}
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeCounties: selectors.getActiveCounties(state)
  }
}

export default connect(mapStateToProps, { setForecastFilter })(CountyRegistry);
