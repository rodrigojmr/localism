import React, { useState, useEffect, useContext } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
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
import usePosition from '../../hooks/usePosition';
import UserContext from '../Context/UserContext';

import MapStyles from '../../MapStyles';
const libraries = ['places'];

const options = {
  styles: MapStyles,
  //disableDefaultUI: true,
  zoomControl: true
};

const Map = React.forwardRef((props, ref) => {
  const [center, setCenter] = useState({
    lat: 38.722252,
    lng: -9.139337
  });
  const { position, error } = usePosition();
  useEffect(() => {
    if (position) {
      setCenter({ lat: position.lat, lng: position.lng });
    }
  }, [position.lat, position.lng]);

  const mapContainerStyle = {
    width: '100%',
    height: props.height
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
    mapRef.current.setZoom(16);
  }, []);

  const setMarker = React.useCallback(({ lat, lng }) => {
    setNewMarker(() => {
      return { lat, lng, time: new Date() };
    });
  }, []);

  const handleAddressSearch = result => {
    const obj = {
      place_id: result.place_id,
      formatted_address: result.formatted_address,
      address_components: result.address_components,
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng()
    };
    console.log(obj);
    props.setAddress(obj);
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div className="map">
      <Search
        ref={ref}
        onAddressSearch={handleAddressSearch}
        setMarker={setMarker}
        panTo={panTo}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
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
              <h2>{selected.name}</h2>
              {/* <p>Created {formatRelative(selected.time, new Date())}</p> */}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
});

const Search = React.forwardRef(
  ({ required, onAddressSearch, panTo, setMarker }, ref) => {
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
    const { currentUser } = useContext(UserContext);

    return (
      <div className="search">
        <label htmlFor="input-address">Address</label>
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
              onAddressSearch(result);
            } catch (error) {
              console.log('Error!', error);
            }
          }}
        >
          <ComboboxInput
            name="address"
            ref={ref({ required: !currentUser })}
            required={required}
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
);

export default Map;
