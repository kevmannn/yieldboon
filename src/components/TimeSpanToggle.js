import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '../selectors';
import { selectTimeSpan } from '../actions';

class TimeSpanToggle extends PureComponent {
  static propTypes = {
    // possibleTimeSpans: PropTypes.arrayOf(PropTypes.object),
    selectedTimeSpan: PropTypes.object
  };

  onClick = (timeSpan) => {
    // this.props.selectTimeSpan(timeSpan);
  };

  render() {
    return (
      <div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedTimeSpan: selectors.getSelectedTimeSpan(state)
  }
}

export default connect(mapStateToProps, { selectTimeSpan })(TimeSpanToggle);
