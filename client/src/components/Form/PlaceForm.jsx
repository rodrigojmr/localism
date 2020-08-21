import React from 'react';
import DatePicker from 'react-datepicker';

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
        <label htmlFor="input-name">name</label>
        <input
          placeholder="Place name"
          type="text"
          name="name"
          id="input-name"
          value={props.address}
          onChange={onvalueChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="input-address">category</label>
        <input
          placeholder="Place category"
          type="text"
          name="category"
          id="input-category"
          value={props.category}
          onChange={onvalueChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="input-open-date">Open Date</label>
        <input
          placeholder="Open Since..."
          type="date"
          name="openDate"
          id="input-open-date"
          value={props.openDate}
          onChange={onvalueChange}
        />
      </div>
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
