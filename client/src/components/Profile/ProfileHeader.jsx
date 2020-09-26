import React from 'react';

const ProfileHeader = ({ user }) => {
  return (
    <section className="profile-info">
      <img
        src={user.avatar}
        alt={user.name}
        className="profile-info__avatar u-border-radius-50"
      />
      <h1 className="heading heading--1 u-margin-bottom-xsmall">{user.name}</h1>
      {user.info?.about && <p>{user.info?.about}</p>}
      <p>{user.locality}</p>
    </section>
  );
};

export default ProfileHeader;
