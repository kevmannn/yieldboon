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

export default class ActiveCountyTable extends PureComponent {
  static propTypes = {
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  // springConfig = { ...presets.stiff, precision: 0.9 };

  // motionStyle = {
  //   opacity: spring(1, this.springConfig),
  //   translation: spring(0, this.springConfig)
  // };

  // willEnter = () => {
  //   return {
  //     opacity: 0.8,
  //     translation: -170
  //   }
  // };

  // willLeave = () => {
  //   return {
  //     opacity: spring(0, this.springConfig),
  //     translation: spring(40, this.springConfig)
  //   }
  // };

  render() {
    // const { activeCounties: { id = 42 } } = this.props;
    return (
    )
  }
}
