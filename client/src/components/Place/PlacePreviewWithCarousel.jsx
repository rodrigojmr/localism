import React, { useEffect } from 'react';
import getHours from 'date-fns/getHours';
import { Link } from 'react-router-dom';
import EmblaCarousel from '../EmblaCarousel';

const { utcToZonedTime } = require('date-fns-tz');

const PlaceMini = props => {
  const place = props.place;

  let openTime, closeTime;
  if (place) {
    if (place.schedule.time.openTime) {
      openTime = getHours(
        utcToZonedTime(place.schedule.time.openTime, 'Europe/Lisbon')
      );
    }
    if (place.schedule.time.closeTime) {
      closeTime = getHours(
        utcToZonedTime(place.schedule.time.closeTime, 'Europe/Lisbon')
      );
    }
  }

  return (
    <article className="place place-preview">
      <EmblaCarousel name={place.name} slides={place.images} />
      <div className="place__row">
        <div className="place__overview">
          <div className="place__title u-margin-bottom-xsmall">
            <h1 className="heading heading--1">{place.name}</h1>
            <p className="category ">{`#${place.category
              .split(' ')
              .join('_')}`}</p>
          </div>
          {place.schedule.time.openTime && place.schedule.time.closeTime && (
            <p className="schedule">
              {`Schedule: ${openTime}h - ${closeTime}h from ${place.schedule.from} to ${place.schedule.to}`}
            </p>
          )}
        </div>
        <span className="suggestions-num-wrapper">{place.supports.length}</span>
      </div>
      <div className="place__row">
        <div className="place__image-wrapper">
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
      <Link to={`/place/${place._id}`}></Link>
    </article>
  );
};

export default PlaceMini;
