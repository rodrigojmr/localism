import React from 'react';
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
  return (
    <div className="search">
      <label htmlFor="input-name"> Search By Name</label>
      <Combobox
        onSelect={async name => {
          // setValue(address, false);
          // clearSuggestions();
          // try {
          //   const results = await getGeocode({ address });
          //   const result = results[0];
          //   const { lat, lng } = await getLatLng(result);
          //   props.panTo({ lat, lng });
          //   props.setMarker({ lat, lng });
          //   props.handleResultInfo(result);
          // } catch (error) {
          //   console.log('Error!');
          // }
        }}
      >
        <ComboboxInput
          id="input-name"
          value={props.searchQuery}
          onChange={e => {
            props.onSearchUpdate(e.target.value);
          }}
        />
        <ComboboxPopover>
          <ComboboxList>
            {/* {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))} */}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default SearchName;
