import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete
} from '@react-google-maps/api';
// import { formatRelative } from 'date-fns';
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng
// } from 'use-places-autocomplete';
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption
// } from '@reach/combobox';
import './../../App.css';
import '@reach/combobox/styles.css';

import MapStyles from '../../MapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '80vh'
};

const options = {
  styles: MapStyles,
  //disableDefaultUI: true,
  zoomControl: true
};

// export default HomeMap;

const Map = props => {
  //setState on marker click and retrieve value when clicked by user

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [selected, setSelected] = React.useState(null);

  //use this to reference the map without causing re-renders
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  const getBoundaries = () => {
    if (mapRef.current) {
      let ne = mapRef.current.getBounds().getNorthEast();
      let sw = mapRef.current.getBounds().getSouthWest();

      const boundaries = {
        neLat: ne.lat(),
        neLng: ne.lng(),
        swLat: sw.lat(),
        swLng: sw.lng()
      };

      props.idleMapSearch(boundaries);
    }
  };

  const getLocality = () => {
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
  };

  const onMapIdle = () => {
    getBoundaries();
    getLocality();
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={props.center}
        options={options}
        // onClick={onMapClick}
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
                    setSelected(place);
                  }}
                />
              );
            })}
          </>
        )}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.location.coordinates[0],
              lng: selected.location.coordinates[1]
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <Link to={`/place/${selected._id}`}>{selected.name}</Link>
              </h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;
