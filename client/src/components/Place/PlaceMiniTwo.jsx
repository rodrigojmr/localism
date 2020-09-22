import React from 'react';
import getHours from 'date-fns/getHours';
import { Link } from 'react-router-dom';

const { utcToZonedTime } = require('date-fns-tz');

const PlaceMini = props => {
  const place = props.place;

  return (
    <div className="place">
      <div className="place__row">
        <div className="place__overview place__overview--full">
          <h1 className="heading heading--1">{place.name}</h1>
        </div>
      </div>
      <div className="place__row">
        <div className="place-mini__image-wrapper">
          <img
            alt={place.name}
            src={place.images[0]}
            className="place__image"
          />
        </div>
        <p className="place__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente,
          ipsum eveniet amet deleniti quisquam deserunt totam quasi sit labore
          placeat voluptas adipisci error voluptate tempora nostrum facere
          repellat provident voluptates!
          {/* {place.description} */}
        </p>
      </div>
      <Link to={`/place/${place._id}`}>
        <div className="place-info-mini__learn-more">
          <p>know more about this place</p>{' '}
          {props.inMap && <span className="bounce-animation">&darr;</span>}
        </div>
      </Link>
    </div>
  );
};

export default PlaceMini;
