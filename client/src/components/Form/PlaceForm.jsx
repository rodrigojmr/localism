import React, { useState } from 'react';
import Map from './../Map/index';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

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

  const setHours = () => {
    let startTime = new Date();
    startTime.setHours(8);
    startTime.setMinutes(0);
    return startTime;
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
          placeholder="category"
          type="text"
          name="category"
          id="input-category"
          value={props.category}
          onChange={onValueChange}
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
      </div>{' '}
      <Map />
      {/* Auto fill from google maps information */}
      <div className="input-group">
        <label htmlFor="input-areaName">Area</label>
        <input
          placeholder="Place areaName"
          type="text"
          name="areaName"
          id="input-areaName"
          value={props.areaName}
          onChange={onValueChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="input-openDate">Open Date</label>
        <DatePicker
          id="input-openDate"
          value={props.openDate ? format(props.openDate, 'dd-MM-yyyy') : props.openDate}
          dateFormat={'dd/MM/yyyy'}
          onChange={date => props.onValueChange('openDate', date)}
        />
      </div>
      <div className="input-group">
        <label>Schedule</label>
        <div className="schedule-inputs-wrapper">
          <div>
            <label htmlFor="input-schedule-open">From:</label>
            <select defaultValue="monday" name="weekDayOpen" id="input-schedule-open">
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          <div>
            <label htmlFor="input-schedule-open">To:</label>
            <select defaultValue="friday" name="weekDayClose" id="input-schedule-close">
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          <div>
            <DatePicker
              selected={props.openTime ? props.openTime : setHours('open')}
              onChange={date => props.onValueChange('openTime', date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
            <DatePicker
              selected={props.closeTime ? props.closeTime : setHours()}
              onChange={date => props.onValueChange('closeTime', date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
        </div>
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
          onChange={phoneNumber => props.onValueChange('phoneNumber', phoneNumber)}
        />
      </div>
      {/*<div className="input-group" id="address">
        <label htmlFor="input-address">Address</label>
        <input
          placeholder="Email"
          type="email"
          name="address"
          id="input-address"
          value={props.address}
          onChange={onValueChange}
        />
  </div>*/}
    </form>
  );
};

export default PlaceForm;
