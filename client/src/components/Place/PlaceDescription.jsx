import React from 'react';
import getHours from 'date-fns/getHours';

const { utcToZonedTime } = require('date-fns-tz');

const PlaceDescription = ({ place, support }) => {
  const openTime = getHours(
    utcToZonedTime(place?.schedule.time.openTime, 'Europe/Lisbon')
  );
  const closeTime = getHours(
    utcToZonedTime(place?.schedule.time.closeTime, 'Europe/Lisbon')
  );

  const localsSupport = () => {
    const numberSupports = place.supports.length;
    if (numberSupports === 1) {
      return `1 local supports this place.`;
    } else if (numberSupports > 1) {
      return `${numberSupports} locals support this place.`;
    } else return `No local supports this place yet.`;
  };

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
        {support && <p className="place-info__supports">{localsSupport()}</p>}
        {place.description && (
          <p className="place-info__description">{place.description}</p>
        )}
      </div>
    </div>
  );
};

export default PlaceDescription;
