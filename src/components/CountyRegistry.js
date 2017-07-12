import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import Table, {
//   TableRow,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableSortLabel,
// } from 'material-ui/Table';
// import Toolbar from 'material-ui/Toolbar';
// import Paper from 'material-ui/Paper';
// import Checkbox from 'material-ui/Checkbox';
// import IconButton from 'material-ui/IconButton';
// import FilterListIcon from 'material-ui-icons/FilterList';

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
