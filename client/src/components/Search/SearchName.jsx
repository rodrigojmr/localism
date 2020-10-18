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

const SearchName = props => {
  const [query, setQuery] = useState('');

  const input = React.useRef();

  const handleSearch = query => {
    setQuery(query);
    props.onSearch(query);
  };

  useEffect(() => {
    if (!input.current) return;
    if (props.searching) {
      input.current.focus();
    } else {
      handleSearch('');
      setQuery('');
      input.current.blur();
    }
  }, [props.searching]);

  const onPlaceSelection = place => {
    props.setSelected(place);
    props.setSearching(false);
  };

  return (
    <div
      className={`search-box ${props.searching ? 'search-box--active' : ''}`}
    >
      <Combobox
        className="search-box__input-wrapper"
        onSelect={async name => {
          handleSearch(name);
          try {
            const place = props.places.find(place => place.name === name);
            onPlaceSelection(place);
          } catch (error) {}
        }}
      >
        <ComboboxInput
          ref={input}
          placeholder={`Search in ${props.locality}...`}
          className="input-hidden"
          id="input-name combobox-input"
          value={query}
          onChange={e => handleSearch(e.target.value)}
        />
        <ComboboxPopover id="combobox-popover">
          <ComboboxList id="combobox-list">
            {props.places &&
              props.places.map(place => {
                return (
                  <ComboboxOption
                    key={place.place_id}
                    className="combobox-option"
                    value={place.name}
                  />
                );
              })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <svg
        onClick={() => props.setSearching(!props.searching)}
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
};

export default SearchName;
