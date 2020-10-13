import React, { Component, useState, useEffect } from 'react';
import HomeMap from '../components/Map/HomeMap';
import PlaceInfoWithCarousel from './../components/Place/PlaceInfoWithCarousel';
import { localityPlaces } from './../services/place';

import Spinner from '../components/Spinner';

const HomeView = () => {
  const searchWrapper = React.createRef();
  const placeInfoWrapper = React.createRef();

  // TODO Pass setLocality as prop to home map
  const [locality, setLocality] = useState('');
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searching, setSearching] = useState(false);
  // Get places and place in selection

  useEffect(() => {
    if (locality) {
      localityPlaces(locality).then(data => {
        setPlaces(data.places);
      });
    }
  }, [locality]);

  return (
    <div className="home">
      <div className="home-info">
        <h1 className="heading heading--1">You are in {locality || '...'}</h1>
      </div>
      <HomeMap
        selected={selected}
        setLocality={setLocality}
        searching={searching}
        setSelected={setSelected}
        setSearching={setSearching}
        places={places}
        handleLocality={setLocality}
      />
      <div
        ref={placeInfoWrapper}
        className={`place-info-mini ${
          selected ? `place-info-mini--expanded` : null
        }`}
      >
        {selected && <PlaceInfoWithCarousel place={selected} />}
      </div>
    </div>
  );
};

export default HomeView;
