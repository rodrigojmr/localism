import React, { useState, useEffect } from 'react';
import SearchName from '../Search/SearchName';
import Map from './Map';
import Spinner from '../Spinner';

// export default HomeMap;

const HomeMap = props => {
  const [mapLoad, setMapLoad] = useState(false);
  const [filteredPlaces, setfilteredPlaces] = useState('');

  const handleSearch = searchQuery => {
    const filteredPlaces = props.places.filter(place =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setfilteredPlaces(filteredPlaces);
  };

  return (
    <>
      {!mapLoad && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      <div className="home-map">
        <Map
          setLocality={props.setLocality}
          setSearching={props.setSearching}
          setSelected={props.setSelected}
          selected={props.selected}
          handleMapLoad={setMapLoad}
          places={props.places}
        />
        <SearchName
          searching={props.searching}
          setSearching={props.setSearching}
          setSelected={props.setSelected}
          onSearch={handleSearch}
          places={props.places}
        />
      </div>
    </>
  );
};

export default HomeMap;
