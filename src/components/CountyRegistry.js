import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Table, {
//   TableRow,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableSortLabel,
// } from 'material-ui/Table';
// import Paper from 'material-ui/Paper';
// import Toolbar from 'material-ui/Toolbar';
// import Checkbox from 'material-ui/Checkbox';
// import IconButton from 'material-ui/IconButton';
// import FilterListIcon from 'material-ui-icons/FilterList';

import * as selectors from '../selectors';
import { setForecastFilter } from '../actions';

class CountyRegistry extends PureComponent {
  static propTypes = {
    activeForecasts: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  componentDidUpdate() {
    // console.log(this.props);
  }

  render() {
    return (
      <div style={{ fontSize: '0.7em', padding: '20px' }}>
        {this.props.activeForecasts.slice(0, 2).map(({ countyName }, i) => <p key={i}>{countyName}</p>)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeForecasts: selectors.getActiveForecasts(state)
  }
}

export default connect(mapStateToProps, { setForecastFilter })(CountyRegistry);
