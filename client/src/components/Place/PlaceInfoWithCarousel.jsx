import React from 'react';
import { Link } from 'react-router-dom';
import PlaceDescription from './PlaceDescription';
import EmblaCarousel from '../EmblaCarousel';

const PlaceInfoWithCarousel = ({ place, support }) => {
  return (
    <article className="place-info">
      <EmblaCarousel name={place.name} slides={place.images} />
      <Link to={`/place/${place._id}`}>
        <PlaceDescription place={place} support={support} />
      </Link>
    </article>
  );
};

export default PlaceInfoWithCarousel;
