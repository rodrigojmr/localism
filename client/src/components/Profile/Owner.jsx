import React from 'react';
import { Link } from 'react-router-dom';

const Owner = ({ place }) => {
  return (
    <div className="owner flex-center-both">
      <Link to={`/profile/${place.owner._id}`}>
        <div className="owner__img-wrapper">
          <img
            className="owner__img"
            src={place.owner.avatar}
            alt={place.owner.name}
          />
          <h3 className="heading heading--3">{place.owner.name}</h3>
          <p className="owner__about">{place.about}</p>
        </div>
      </Link>
    </div>
  );
};

export default Owner;
