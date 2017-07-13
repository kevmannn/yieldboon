import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
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

// import { setForecastFilter } from '../actions';

export default class CountyRegistry extends PureComponent {
  static propTypes = {
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    return (
      <div>{this.props.activeCounties.length}</div>
    )
  }
}

// export default connect({ filterActiveCounties })(CountyRegistry);
