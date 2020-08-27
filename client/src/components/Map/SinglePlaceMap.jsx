import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

import './../../App.css';
import '@reach/combobox/styles.css';

import MapStyles from '../../MapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '30vh'
};

const options = {
  styles: MapStyles
  //disableDefaultUI: true,
  //zoomControl: true
};

const Map = props => {
  const coor = props.place.location.coordinates;
  const center = {
    lat: coor[0],
    lng: coor[1]
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'pt',
    libraries
  });
  //setState on marker click and retrieve value when clicked by user
  const [selected, setSelected] = React.useState(null);
  const [marker, setNewMarker] = React.useState();

  //use this to reference the map without causing re-renders
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  const setMarker = React.useCallback(({ lat, lng }) => {
    setNewMarker(current => {
      return { lat, lng, time: new Date() };
    });
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {props.place && (
          <Marker
            position={{ lat: center.lat, lng: center.lng }}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
            }}
            onClick={() => {
              setSelected(props.place);
            }}
          />
        )}
        {selected ? (
          <InfoWindow
            position={{ lat: center.lat, lng: center.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Some Place</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;
