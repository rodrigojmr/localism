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

const SearchName = props => {
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
            props.panTo({ lat, lng });
            props.setMarker({ lat, lng });
            props.handleResultInfo(result);
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
};

export default SearchName;
