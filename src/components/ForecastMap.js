import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import isEqual from 'lodash/isEqual';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';

// import * as selectors from '../selectors';
import ForecastMapMarker from './ForecastMapMarker';

// eslint-disable-next-line
const token = process.env.mapboxAPIToken;

class ForecastMap extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    highlighted: PropTypes.instanceOf(Map).isRequired,
    inclementForecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
    aggregateActiveForecastSeries: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  shouldComponentUpdate({ highlighted }, nextState) {
    return !isEqual(highlighted, this.props.highlighted)
      || !isEqual(nextState, this.state)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({
      ...this.state.viewport,
      width: window.innerWidth,
      height: window.innerHeight
    })
  };

  onViewportChange = (viewport) => {
    this.setState({ viewport });
  };

  render() {
    const { viewport } = this.state;
    const {
      // isFetching,
      // highlighted,
      // inclementForecasts,
      // aggregateActiveForecastSeries
    } = this.props;
    return (
      <MapGL
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this.onViewportChange}>
      </MapGL>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: selectors.getIsFetching(state),
    highlighted: selectors.getHighlighted(state),
    inclementForecasts: selectors.getInclementForecasts(state),
    aggregateActiveForecastSeries: selectors.getAggregateActiveForecastSeries(state)
  }
}

export default connect(mapStateToProps)(ForecastMap);
