import React from 'react';
import { Link } from 'react-router-dom';

const SupportWithContent = ({ place, content }) => {
  const style = {
    backgroundImage: `url(${place.images[0]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  };

  return (
    <div className="support-item">
      <Link to={`/place/${place._id}`}>
        <article className="support-item__place-container">
          <div className="support-item__place-img-wrapper" style={style}></div>
          <div className="support-item__details">
            <h3 className="heading heading--3">{place.name}</h3>
            <p className="support-item__content">&ldquo;{content}&rdquo;</p>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default SupportWithContent;
