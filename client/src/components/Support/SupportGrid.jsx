import React from 'react';
import { Link } from 'react-router-dom';

const SupportGrid = ({ place }) => {
  const supportsWithoutComments = () =>
    place.supports.filter(support => support.content === '');

  return (
    <>
      <div className="supports__wrapper">
        {supportsWithoutComments().map(support => (
          <div className="support-small" key={support._id}>
            <Link to={`/profile/${support.creator._id}`}>
              <img
                className="u-border-radius-50"
                src={support.creator.avatar}
                alt={support.creator.username}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default SupportGrid;
