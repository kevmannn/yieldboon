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
    // isFetching: PropTypes.bool.isRequired,
    // errorMessage: PropTypes.string.isRequired,
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCounties: []
    }
  }

  onSelectState = (state) => {
    this.props.onSelectState(state);
  };

  onClick = () => {};

  onSelectAllClick = () => {
    this.setState({ selectedCounties: this.props.activeCounties });
  };

  render() {
    const {
      // isFetching,
      // errorMessage,
      activeCounties
    } = this.props;
    // const { isSelected } = this.state;
    return (
      <div style={{ padding: '40px' }}>
        <MuiThemeProvider>
          {/*<FilterBar
            selectedState={selectedState}
            onSelectState={this.onSelectState}
            onSelectAllClick={this.onSelectAllClick} />*/}
          <Table>
            {/*<TableHead></TableHead>*/}
            <TableBody>
              {activeCounties.map(({ countyName, soybeanYield, totalRainfall }, i) => (
                <TableRow
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
    // isFetching: selectors.getIsFetching(state),
    // errorMessage: selectors.getErrorMessage(state),
    activeCounties: selectors.getActiveCounties(state)
  }
}

export default connect(mapStateToProps, { setForecastFilter })(CountyRegistry);
