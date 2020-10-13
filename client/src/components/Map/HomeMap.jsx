import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import panTo from '../../hooks/panTo';
import usePosition from '../../hooks/usePosition';
import useMapLocalityAxios from '../../hooks/useMapLocalityAxios';
import SearchName from '../Search/SearchName';
import useTraceUpdate from '../../hooks/useTraceUpdate';
import Spinner from '../../components/Spinner';
import Map from './Map';

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
  );
};

export default HomeMap;
