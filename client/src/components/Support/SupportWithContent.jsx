import React from 'react';
import { Link } from 'react-router-dom';

const SupportWithContent = ({ place, content }) => {
  const style = {
    backgroundImage: `url(${place.images[0]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  };

  return (
    <div className="place-support">
      <Link to={`/place/${place._id}`}>
        <article className="place-support__place-container">
          <div className="place-support__place-img-wrapper" style={style}></div>
          <div className="place-support__details">
            <h3 className="heading heading--3 u-margin-bottom-xxsmall">
              {place.name}
            </h3>
            <p className="place-support__content">&ldquo;{content}&rdquo;</p>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default SupportWithContent;
