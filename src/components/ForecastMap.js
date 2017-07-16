import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGL, { Layer, Feature } from 'react-mapbox-gl';

import { MAPBOX_API_KEY as accessToken } from '../constants';

const MapGL = ReactMapboxGL({ accessToken });

export default class ForecastMap extends PureComponent {
  static propTypes = {
    highlighted: PropTypes.object,
    activeForecasts: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  // getMapBounds() {}

  render() {
    return (
      <MapGL
        style="mapbox://styles/mapbox/light-v9" // eslint-disable-line
        zoom={8}
        center={[-70.4065859, -24.6274856]}
        containerStyle={{
          height: '100%',
          width: '500px'
        }}>
        {/*<Layer>
          <Feature coordinates={[-70.4065859, -24.6274856]} />
        </Layer>*/}
      </MapGL>
    )
  }
}
