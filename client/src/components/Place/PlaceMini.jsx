import React from 'react';
import getHours from 'date-fns/getHours';
import { Link } from 'react-router-dom';

const { utcToZonedTime } = require('date-fns-tz');

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
    <div className="place">
      <div className="place__row">
        <div className="place__overview">
          <div className="place__title u-margin-bottom-xsmall">
            <h1 className="heading heading--1">{selected.name}</h1>
            <p className="category ">{`#${selected.category
              .split(' ')
              .join('_')}`}</p>
          </div>
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
      <div className="place__row">
        <div className="place__image-wrapper">
          <img
            alt={selected.name}
            src={selected.images[0]}
            className="place__image"
          />
        </div>
        <p className="place__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente,
          ipsum eveniet amet deleniti quisquam deserunt totam quasi sit labore
          placeat voluptas adipisci error voluptate tempora nostrum facere
          repellat provident voluptates!
          {/* {selected.description} */}
        </p>
      </div>
      <Link to={`/place/${selected._id}`}>
        <div className="place-info-mini__learn-more">
          <p>know more about this place</p>{' '}
          {props.inMap && <span className="bounce-animation">&darr;</span>}
        </div>
      </Link>
    </div>
  );
};

export default PlaceMini;
