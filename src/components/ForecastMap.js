import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGL, { Layer, Feature } from 'react-mapbox-gl';

import { MAPBOX_API_KEY as accessToken } from '../constants';

const MapGL = ReactMapboxGL({ accessToken });
const containerStyle = {
  height: '400px',
  width: '100%'
}

export default class ForecastMap extends PureComponent {
  static propTypes = {
    highlighted: PropTypes.object,
    activeForecasts: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: [7],
      center: [-48.5852037, -1.3083065],
      // fitBounds: null
    }
  }

  onDrag = () => {};

  render() {
    const { zoom, center } = this.state;
    return (
      <div>
        <MapGL
          style="mapbox://styles/mapbox/light-v9" // eslint-disable-line
          zoom={zoom}
          center={center}
          onDrag={this.onDrag}
          containerStyle={containerStyle}>
        </MapGL>
      </div>
    )
  }
}
