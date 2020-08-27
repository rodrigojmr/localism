import React from 'react';
import getHours from 'date-fns/getHours';

const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz');

const PlaceMini = props => {
  const selected = props.selected;
  let openTime, closeTime;

  if (selected) {
    if (selected.schedule.time.openTime) {
      openTime = getHours(
        utcToZonedTime(selected.schedule.time.openTime, 'Europe/Lisbon')
      );
    }
    if (selected.schedule.time.closeTime) {
      closeTime = getHours(
        utcToZonedTime(selected.schedule.time.closeTime, 'Europe/Lisbon')
      );
    }
  }

  return (
    <div className="place-info">
      <div className="place-info__row">
        <div className="place-info__overview">
          <h1 className="heading heading--1">{selected.name}</h1>
          <p className="category">{`#${selected.category
            .split(' ')
            .join('_')}`}</p>
          {selected.schedule.time.openTime &&
            selected.schedule.time.closeTime && (
              <p className="schedule">
                {`Schedule: ${openTime}h - ${closeTime}h from ${selected.schedule.from} to ${selected.schedule.to}`}
              </p>
            )}
        </div>
        <span className="suggestions-num-wrapper">
          {selected.supports.length}
        </span>
      </div>
      <div className="place-info__row">
        <div className="place-info-mini__image-wrapper">
          <img src={selected.images[0]} className="place-info__image" />
        </div>
        <p className="place-info__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente,
          ipsum eveniet amet deleniti quisquam deserunt totam quasi sit labore
          placeat voluptas adipisci error voluptate tempora nostrum facere
          repellat provident voluptates!
          {/* {selected.description} */}
        </p>
      </div>
      <div className="place-info-mini__learn-more">
        <p>know more about this place</p>{' '}
        {props.inMap && <span className="bounce-animation">&darr;</span>}
      </div>
    </div>
  );
};

export default PlaceMini;
