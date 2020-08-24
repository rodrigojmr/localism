import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import './../../App.css';
import '@reach/combobox/styles.css';

import MapStyles from '../../MapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
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
  //setState on marker click and retrieve value when clicked by user
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback(event => {
    setMarkers(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      }
    ]);
  }, []);

  //use this to reference the map without causing re-renders
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div>
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map(marker => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15)
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Some Place</h2>
              <p>Created {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

const Locate = ({ panTo }) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          () => null
        );
      }}
    >
      <img
        src="https://listimg.pinclipart.com/picdir/s/101-1016750_compass-clipart-transparent-background-compass-rose-for-a.png"
        alt="location-compass"
      />
    </button>
  );
};

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      // location: {
      //   lat: () => 6.5568767999999995,
      //   lng: () => 3.3488895999999997
      // },
      // radius: 200 * 1000
    }
  });
  console.log('ready: ', ready);
  return (
    <div className="search">
      <label htmlFor="input-address"> Address</label>
      <Combobox
        onSelect={async address => {
          setValue(address, false);
          console.log('address: ', address);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            console.log('results: ', results);
            const { lat, lng } = await getLatLng(results[0]);
            console.log(lat, lng);
            panTo({ lat, lng });
          } catch (error) {
            console.log('Error!');
          }
        }}
      >
        <ComboboxInput
          id="input-address"
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter your address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Map;
