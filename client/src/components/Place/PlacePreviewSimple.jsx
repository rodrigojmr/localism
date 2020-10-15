import React from 'react';
import { Link } from 'react-router-dom';

const PlacePreviewSimple = ({ place }) => {
  return (
    <div className="place-preview-simple">
      <div className="place-preview-simple__img-wrapper">
        <img
          src={place.images[0]}
          alt={place.name}
          className="place-preview-simple__img"
        />
      </div>
      <Link to={`/place/${place._id}`}>
        <h4 className="heading heading--4">{place.name}</h4>
      </Link>
    </div>
  );
};

export default PlacePreviewSimple;
