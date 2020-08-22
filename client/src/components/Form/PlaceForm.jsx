import React, { useState } from 'react';

import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

//import { GoogleMap, LoadScript } from '@react-google-maps/api';

export const PlaceForm = props => {
  const onFormSubmission = event => {
    event.preventDefault();
    props.onFormSubmission();
  };

  const onValueChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    props.onValueChange(name, value);
  };

  return (
    <form className="form form-create-place" onSubmit={onFormSubmission}>
      <div className="input-group">
        <label htmlFor="input-name">Name</label>
        <input
          placeholder="Name"
          type="text"
          name="name"
          id="input-name"
          value={props.name}
          onChange={onValueChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="input-address">Category</label>
        <input
          placeholder="Address"
          type="text"
          name="category"
          id="input-category"
          value={props.category}
          onChange={onValueChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="input-openDate">Open Date</label>
        <DatePicker
          id="input-openDate"
          value={
            props.openDate
              ? format(props.openDate, 'dd-MM-yyyy')
              : props.openDate
          }
          dateFormat={'dd/MM/yyyy'}
          onChange={date => props.onValueChange('openDate', date)}
        />
      </div>
      {/* Connect with google maps */}
      <div className="input-group">
        <label htmlFor="input-address">Address</label>
        <input
          placeholder="Place address"
          type="text"
          name="address"
          id="input-address"
          value={props.address}
          onChange={onValueChange}
        />
      </div>
      {/* weekDayFrom: '',
      weekDayTo: '',
      openTime: '',
    closeTime: '', */}
      <div className="input-group">
        <label htmlFor="input-phoneNumber">Phone Number</label>
        <PhoneInput
          id="input-phoneNumber"
          value={props.phoneNumber}
          onChange={phoneNumber =>
            props.onValueChange('phoneNumber', phoneNumber)
          }
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
          onChange={onValueChange}
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
          onChange={onValueChange}
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
          onChange={onValueChange}
        />
      </div>
    </form>
  );
};

export default PlaceForm;
