import React, { useEffect } from 'react';
import getHours from 'date-fns/getHours';
import { Link } from 'react-router-dom';
import EmblaCarousel from '../EmblaCarousel';

const { utcToZonedTime } = require('date-fns-tz');

const PlacePreviewWithCarousel = props => {
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
      <Link to={`/place/${place._id}`}>
        <div className="place-preview__body">
          <div className="row place-preview__info">
            <div className="place-preview__title">
              <h3 className="heading heading--1">{place.name}</h3>
              <p className="category u-margin-left-xsmall">{`#${place.category
                .split(' ')
                .join('_')}`}</p>
            </div>
            {place.schedule.time.openTime && place.schedule.time.closeTime && (
              <p className="schedule">
                Open:{' '}
                <span className="schedule__time">
                  {`${openTime}h - ${closeTime}h from ${place.schedule.from} to ${place.schedule.to}`}
                </span>
              </p>
            )}
            <p className="place-preview__supports">
              {`${place.supports.length} ${
                place.supports.length > 1
                  ? `locals support this place`
                  : `local supports this place`
              }`}
            </p>
            {place.description && (
              <p className="place-preview__description">{place.description}</p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PlacePreviewWithCarousel;
