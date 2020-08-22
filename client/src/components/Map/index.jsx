import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete
} from '@react-google-maps/api';
// import { formatRelative } from 'date-fns';
// import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption
// } from '@reach/combobox/styles.css';
import MapStyles from './../../MapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '50vw',
  height: '50vh',
  margin: '0 auto'
};

const center = {
  lat: 6.5568767999999995,
  lng: 3.3488895999999997
};

const options = {
  styles: MapStyles
  //disableDefaultUI: true,
  //zoomControl: true
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  const [markers, setMarkers] = React.useState([]);
  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={event => {
          console.log(event);
          setMarkers(current => [
            ...current,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date()
            }
          ]);
        }}
      >
        {' '}
        {markers.map(markers => (
          <Marker
            key={markers.time.toISOString()}
            position={{ lat: markers.lat, lng: markers.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
