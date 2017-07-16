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
// import { MuiThemeProvider } from 'material-ui/styles';
// import { spring, presets, TransitionMotion } from 'react-motion';

import * as selectors from '../selectors';
import { setForecastFilter } from '../actions';

class CountyRegistry extends PureComponent {
  static propTypes = {
    activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  componentDidUpdate() {
    // console.log(this.props);
  }

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
    return (
      <div style={{ fontSize: '0.7em', padding: '20px' }}>
        {/*this.props.activeCounties.slice(0, 2).map(({ countyName }, i) => <p key={i}>{countyName}</p>)*/}
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
