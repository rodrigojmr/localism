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

const Map = props => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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

  const handleResultInfo = result => {
    console.log('result: ', result);
    const obj = {
      place_id: result.place_id,
      formatted_address: result.formatted_address,
      address_components: result.address_components,
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng()
    };

    for (let key in obj) {
      props.resultInfoHandler(key, obj[key]);
    }
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div>
      <Search
        handleResultInfo={handleResultInfo}
        setMarker={setMarker}
        panTo={panTo}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={props.center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {marker && (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        )}
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

function Search({ handleResultInfo, panTo, setMarker }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      // location: {
      //   lat: () => 6.5568767999999995, - Get current user location
      //   lng: () => 3.3488895999999997 - Get current user location
      // },
      // radius: 200 * 1000
    }
  });
  return (
    <div className="search">
      <label htmlFor="input-address"> Address</label>
      <Combobox
        onSelect={async address => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const result = results[0];
            const { lat, lng } = await getLatLng(result);
            panTo({ lat, lng });
            setMarker({ lat, lng });
            handleResultInfo(result);
          } catch (error) {
            console.log('Error!', error);
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
              data.map(({ place_id, description }) => {
                return <ComboboxOption key={place_id} value={description} />;
              })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Map;
