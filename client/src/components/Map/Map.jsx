import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import panTo from '../../hooks/panTo';
import usePosition from '../../hooks/usePosition';
import useMapLocalityAxios from '../../hooks/useMapLocalityAxios';
import Spinner from '../../components/Spinner';

import './../../App.css';
import '@reach/combobox/styles.css';
import MapStyles from '../../MapStyles';

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
  // Initial map search
  const [mapCenter, setMapCenter] = useState({
    lat: 38.722252,
    lng: -9.139337
  });

  const mapRef = React.useRef();
  const onMapLoad = map => {
    mapRef.current = map;
    setInitialCenter(position);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'pt'
  });

  useEffect(() => {
    props.handleMapLoad(isLoaded);
  }, [isLoaded]);

  // Get user position
  const { position, error } = usePosition();

  const [
    mapLocality,
    loading,
    localityError,
    fetchLocality
  ] = useMapLocalityAxios(position);

  // Set map on user location on load
  useEffect(() => {
    setInitialCenter(position);
  }, [position]);

  const setInitialCenter = React.useCallback(
    ({ lat, lng }) => {
      if (!mapRef.current) return;

      panTo(mapRef, {
        lat,
        lng
      });
      setMapCenter({ lat, lng });
    },
    [position.lat, position.lng]
  );

  // Every time the map is idle, change the mapCenter state
  const handleIdle = () => {
    if (!mapRef.current) return;
    changeMapCenter();
    fetchLocality(mapCenter);
  };

  const changeMapCenter = React.useCallback(async () => {
    if (
      mapRef.current.getCenter().lat() !== mapCenter.lat ||
      mapRef.current.getCenter().lng() !== mapCenter.lng
    ) {
      const lat = mapRef.current.getCenter().lat();
      const lng = mapRef.current.getCenter().lng();

      setMapCenter({
        lat,
        lng
      });
    }
  }, [mapCenter.lat, mapCenter.lng]);

  useEffect(() => {
    if (!mapLocality) return;
    props.setLocality(mapLocality);
  }, [mapLocality]);

  const handlePlaceSelection = place => {
    props.setSelected(place);
    props.setSearching(false);
  };

  useEffect(() => {
    if (!props.selected) return;
    panTo(mapRef, {
      lat: props.selected.location.coordinates[0],
      lng: props.selected.location.coordinates[1]
    });
  }, [props.selected]);

  if (loadError) return 'Error loading maps';
  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={mapCenter}
          options={options}
          onClick={() => handlePlaceSelection(null)}
          onLoad={onMapLoad}
          onIdle={handleIdle}
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
                      url:
                        'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
                    }}
                    onClick={() => {
                      handlePlaceSelection(place);
                    }}
                  />
                );
              })}
            </>
          )}
        </GoogleMap>
      ) : null}
    </>
  );
};

export default Map;
