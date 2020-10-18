import React, { Component, useContext } from 'react';
import PlaceForm from '../../components/Form/PlaceForm';
import UserContext from '../../components/Context/UserContext';

// TODO Refactor into hooks or react-hook-form
const CreatePlace = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="create-place">
      <div className="create-place-title">
        <h1 className="heading heading--1">
          Hey {currentUser.name},<br />
          do you own a place
          <br />
          in this area?
        </h1>
        <h2 className="heading heading--2">
          Let locals know better, register your place!
        </h2>
      </div>
      {/* Make two separate sections for this */}
      <div className="create-place-form-wrapper">
        <PlaceForm />
      </div>
    </div>
  );
};

export default CreatePlace;
