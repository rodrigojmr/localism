import React from 'react';
import getHours from 'date-fns/getHours';

const { utcToZonedTime } = require('date-fns-tz');

const PlaceDescription = ({ place, support }) => {
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
    <div className="place-info__body">
      <div className="row place-info__info">
        <div className="place-info__title">
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
        {support && (
          <p className="place-info__supports">
            {`${place.supports.length} ${
              place.supports.length > 1
                ? `locals support this place`
                : `local supports this place`
            }`}
          </p>
        )}
        {place.description && (
          <p className="place-info__description">{place.description}</p>
        )}
      </div>
    </div>
  );
};

export default PlaceDescription;
