import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';

// import Loader from './Loader';

const token = process.env.mapboxAPIToken; // eslint-disable-line

export default class ForecastMap extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    highlighted: PropTypes.object,
    activeForecasts: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    const { lat: latitude, lng: longitude } = props.activeForecasts[0].coords;
    this.state = {
      popupContent: null,
      viewport: {
        latitude,
        longitude,
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

  shouldComponentUpdate({ highlighted, activeForecasts }, nextState) {
    return !isEqual(highlighted, this.props.highlighted)
      || !isEqual(activeForecasts, this.props.activeForecasts)
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
    const { viewport, popupContent } = this.state;
    const {
      // isFetching,
      // highlighted,
      activeForecasts
    } = this.props;
    return (
      <MapGL
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={this.onViewportChange}>
        {activeForecasts.map(({ id, coords: { lat, lng } }) => (
          <Marker
            key={id}
            latitude={lat}
            longitude={lng}>
            {id}
          </Marker>
        ))}
      </MapGL>
    )
  }
}
