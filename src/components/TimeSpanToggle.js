import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '../selectors';
import { selectTimeSpan } from '../actions';

class TimeSpanToggle extends PureComponent {
  static propTypes = {
    // isDisabled: PropTypes.bool,
    selectedTimeSpan: PropTypes.object,
    possibleTimeSpanRanges: PropTypes.arrayOf(PropTypes.object)
  };

  onClick = (range) => {
    this.props.selectTimeSpan({ range });
  };

  render() {
    const {
      selectedTimeSpan: { range: selectedRange },
      possibleTimeSpanRanges
    } = this.props;
    return (
      <div>
        {possibleTimeSpanRanges.map((range, i) => (
          <div
            key={i}
            style={{ fontSize: '0.8em' }}
            onClick={() => this.onClick(range)}>
            <span style={{}}>{range}</span>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {,
    selectedTimeSpan: selectors.getSelectedTimeSpan(state),
    possibleTimeSpanRanges: selectors.getPossibleTimeSpanRanges(state)
  }
}

export default connect(mapStateToProps, { selectTimeSpan })(TimeSpanToggle);
