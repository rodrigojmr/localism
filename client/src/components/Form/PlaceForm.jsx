import React from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

export const PlaceForm = props => {
  const handleFormSubmission = event => {
    event.preventDefault();
    props.onFormSubmission();
  };

  const handleContentInputChange = event => {
    const content = event.target.value;
    props.onContentChange(content);
  };

  return (
    <form className="form form-create-place" onSubmit={handleFormSubmission}>
      <div className="input-group">
        <label htmlFor="input-address">Address</label>
        <input
          value={props.address}
          type="text"
          name="address"
          id="input-address"
          onChange={handleContentInputChange}
        />
      </div>
    </form>
  );
};

export default PlaceForm;
