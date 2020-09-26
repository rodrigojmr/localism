import React from 'react';
import { Link } from 'react-router-dom';

const SupportFromUser = ({ support }) => {
  return (
    <div className="user-support">
      <div className="user-support__user">
        <Link to={`/profile/${support.creator._id}`}>
          <img
            className="user-support__user-img u-border-radius-50"
            src={support.creator.avatar}
            alt={support.creator.name}
          />
        </Link>
      </div>
      <div className="user-support__description">
        <h3 className="heading heading--3">{support.creator.name}</h3>
        <p className="user-support__text">{support.content}</p>
      </div>
    </div>
  );
};

export default SupportFromUser;
