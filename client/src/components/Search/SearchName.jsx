import React, { useState, useEffect } from 'react';
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
  const [isSearching, setSearch] = useState(false);

  const toggleSearch = search => {
    setSearch(search);
    if (search) {
      const input = document.querySelector('.search-box input');
      document.querySelector('.search-box input').focus();
    } else {
      props.onSearchUpdate('');
    }
  };

  return (
    <div
      className={`search-box ${props.isSearching ? 'search-box--active' : ''}`}
    >
      <Combobox
        className="search-box__input-wrapper"
        onSelect={async name => {
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
          placeholder={`Search in ${props.locality}...`}
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
      <svg
        onClick={() => props.toggleSearch(!props.isSearching)}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon--s icon--primary search-bar__icon feather feather-search"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  );
});

export default SearchName;
