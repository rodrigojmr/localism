import React from 'react';

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
      <h4 className="heading heading--4">{place.name}</h4>
    </div>
  );
};

export default PlacePreviewSimple;
