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

const SearchName = React.forwardRef((props, ref) => {
  return (
    <div className="search-bar__input-wrapper">
      <Combobox
        style={{ display: 'flex' }}
        onSelect={async name => {
          console.log('name: ', name);
          props.onSearchUpdate(name);
          try {
            const place = props.places.find(place => place.name === name);
            props.handlePlaceSelection(place);
          } catch (error) {
            console.log('Error!');
          }
        }}
      >
        <ComboboxInput
          className="input-hidden"
          ref={ref}
          id="input-name"
          value={props.searchQuery}
          onChange={e => {
            props.onSearchUpdate(e.target.value);
          }}
        />
        <ComboboxPopover>
          <ComboboxList>
            {props.places &&
              props.places.map(place => {
                return (
                  <ComboboxOption key={place.place_id} value={place.name} />
                );
              })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
});

export default SearchName;
