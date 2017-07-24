import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table, {
  TableRow,
  TableBody,
  TableCell,
  // TableHead,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { MuiThemeProvider } from 'material-ui/styles';

import * as selectors from '../selectors';
import { setForecastFilter } from '../actions';

class CountyRegistry extends PureComponent {
  static propTypes = {
    selectedState: PropTypes.string.isRequired,
    // Provided via connect:
    // errorLog: PropTypes.object,
    // isFetching: PropTypes.bool,
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCounties: props.activeCounties.map(({ id }) => id)
    }
  }

  onClick = () => {};

  onSelectAllClick = () => {
    this.setState({ selectedCounties: this.props.activeCounties });
  };

  render() {
    const { activeCounties } = this.props;
    // const { selectedCounties } = this.state;
    return (
      <div style={{
        margin: '10px',
        boxShadow: '0 1px 3px 0 rgba(7, 9, 15, 0.3), 0 1px 1px 0 rgba(7, 9, 15, 0.14), 0 2px 1px -1px rgba(7, 9, 15, 0.2)'
      }}>
        <MuiThemeProvider>
          <Table>
            {/*<TableHead></TableHead>*/}
            <TableBody>
              {activeCounties.slice(0, 2).map(({ id, countyName, soybeanYield, totalRainfall }) => (
                <TableRow
                  key={id}
                  selected={false}>
                  <TableCell
                    checkbox
                    onClick={this.onClick}>
                    <Checkbox checked={true} />
                  </TableCell>
                  <TableCell>
                    {countyName}
                  </TableCell>
                  <TableCell numeric>
                    {soybeanYield}
                  </TableCell>
                  <TableCell numeric>
                    {totalRainfall}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // errorLog: selectors.getErrorLog(state),
    // isFetching: selectors.getIsFetching(state),
    activeCounties: selectors.getActiveCounties(state)
  }
}

export default connect(mapStateToProps, { setForecastFilter })(CountyRegistry);
