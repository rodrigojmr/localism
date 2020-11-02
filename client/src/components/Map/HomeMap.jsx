import React, { useState } from 'react';
import SearchName from '../Search/SearchName';
import Map from './Map';
import Spinner from '../Spinner';

// export default HomeMap;

const HomeMap = props => {
  const [mapLoad, setMapLoad] = useState(false);
  const [filteredPlaces, setfilteredPlaces] = useState(props.places);

  const handleSearch = searchQuery => {
    const filteredPlaces = props.places.filter(place =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setfilteredPlaces(filteredPlaces);
  };

  // TODO Refactor to use Context

  return (
    <>
      {!mapLoad && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      <div className="home-map">
        <Map
          places={props.searching ? filteredPlaces : props.places}
          setLocality={props.setLocality}
          setSearching={props.setSearching}
          setSelected={props.setSelected}
          selected={props.selected}
          handleMapLoad={setMapLoad}
        />
        <SearchName
          locality={props.locality}
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
