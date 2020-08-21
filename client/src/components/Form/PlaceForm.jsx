import React from 'react';

//import { GoogleMap, LoadScript } from '@react-google-maps/api';

export const PlaceForm = props => {
  const onFormSubmission = event => {
    event.preventDefault();
    props.onFormSubmission();
  };

  const onvalueChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    props.onvalueChange(name, value);
  };

  return (
    <form className="form form-create-place" onSubmit={onFormSubmission}>
      <div className="input-group">
        <label htmlFor="input-address">Address</label>
        <input
          placeholder="Place address"
          type="text"
          name="address"
          id="input-address"
          value={props.address}
          onChange={onvalueChange}
        />
      </div>
    </form>
  );
};

export default PlaceForm;
