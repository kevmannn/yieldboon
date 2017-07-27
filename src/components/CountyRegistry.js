import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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

  onClick = (id) => {};

  onSelectAllClick = () => {
    const selectedCountyIds = this.props.activeCounties.map(({ id }) => id);
    this.setState({ selectedCountyIds });
  };

  theme = createMuiTheme({
    overrides: {
      MuiTable: {
        root: {}
      },
      MuiTableRow: {
        root: {}
      }
    }
  });

  render() {
    const { isFetching, activeCounties } = this.props;
    // const { selectedCountyIds } = this.state;
    return (
      <div style={{
        margin: '10px',
        height: '340px',
        display: 'block',
        padding: '10px',
        position: 'relative',
        boxShadow: '0 1px 3px 0 rgba(7, 9, 15, 0.3), 0 1px 1px 0 rgba(7, 9, 15, 0.14), 0 2px 1px -1px rgba(7, 9, 15, 0.2)'
      }}>
        {isFetching
          ? <div className="buffer load">loading...</div>
          : <MuiThemeProvider theme={this.theme}>
            <Table>
              <TableHead></TableHead>
              <TableBody>
                {activeCounties.slice(0, 2).map(({ id, countyName, soybeanYield, totalRainfall }) => (
                  <TableRow
                    key={id}
                    selected={false}>
                    <TableCell
                      checkbox
                      onClick={id => this.onClick(id)}>
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
