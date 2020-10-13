// TypeAheadDropDown.js
import React, { useState } from 'react';

const TypeAheadDropDown = props => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');

  const onTextChange = e => {
    const { items } = props;
    let arr = [];
    const value = e.target.value;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      arr = items.sort().filter(v => regex.test(v));
    }

    setSuggestions(arr);
    setText(value);
  };

  const suggestionSelected = value => {
    setText(value);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(city => (
          <li key={city} onClick={e => suggestionSelected(city)}>
            {city}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="TypeAheadDropDown">
      <input
        onChange={onTextChange}
        placeholder="Search city name"
        value={text}
        type="text"
      />
      {renderSuggestions()}
    </div>
  );
};

export default TypeAheadDropDown;
