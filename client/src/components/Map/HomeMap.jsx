import React from 'react';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import './../../App.css';
import '@reach/combobox/styles.css';

import MapStyles from '../../MapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100%'
};

const options = {
  styles: MapStyles,
  streetViewControl: false,
  fullscreenControl: false,
  //disableDefaultUI: true,
  zoomControl: false
};

// export default HomeMap;

const Map = props => {
  //setState on marker click and retrieve value when clicked by user

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'pt',
    libraries
  });

  //use this to reference the map without causing re-renders
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.setZoom(15);
    mapRef.current.panTo({ lat, lng });
  }, []);

  const getBoundaries = () => {
    if (props.center && mapRef.current) {
      let ne = mapRef.current.getBounds().getNorthEast();
      let sw = mapRef.current.getBounds().getSouthWest();

      const boundaries = {
        neLat: ne.lat(),
        neLng: ne.lng(),
        swLat: sw.lat(),
        swLng: sw.lng()
      };

      props.idleAddressMap(boundaries);
    }
  };

  const getLocality = () => {
    if (props.center) {
      let geocoder = new window.google.maps.Geocoder();

      const center = {
        lat: mapRef.current.getCenter().lat(),
        lng: mapRef.current.getCenter().lng()
      };

      geocoder.geocode({ location: center }, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            const result = results[0].address_components.find(
              component =>
                component.types.includes('locality') ||
                component.types.includes('administrative_area_level_1')
            );
            if (result) {
              props.onLocalityUpdate(result.short_name);
            }
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }
  };

  const onMapIdle = () => {
    getBoundaries();
    getLocality();
  };

  const onPlaceClick = place => {
    props.handlePlaceSelection(place);
    panTo({
      lat: place.location.coordinates[0],
      lng: place.location.coordinates[1]
    });
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div className="home-map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={props.center}
        options={options}
        onClick={() => props.handlePlaceSelection(null)}
        onLoad={onMapLoad}
        onIdle={onMapIdle}
      >
        {props.places.length && (
          <>
            {props.places.map(place => {
              return (
                <Marker
                  key={place.place_id}
                  position={{
                    lat: place.location.coordinates[0],
                    lng: place.location.coordinates[1]
                  }}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
                  }}
                  onClick={() => {
                    onPlaceClick(place);
                  }}
                />
              );
            })}
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
