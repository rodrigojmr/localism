import React, { useState, useEffect } from 'react';
import { loadAllPlaces } from './../../services/place';
import Spinner from '../../components/Spinner';

import PlaceInfoWithCarousel from './../../components/Place/PlaceInfoWithCarousel';

const PlacesList = () => {
  const [loaded, setLoaded] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    loadAllPlaces().then(data => {
      setPlaces(data.places);
      setLoaded(true);
    });
  }, []);

  return (
    <div className="places">
      {loaded ? (
        <div className="places-list">
          {places.map(place => (
            <PlaceInfoWithCarousel key={place._id} place={place} support />
          ))}
        </div>
      ) : (
        <div className="loading">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default PlacesList;
