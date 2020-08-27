import React from 'react';
import MapSearch from '../Map/MapSearch';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

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

  const handleImagesInputChange = event => {
    const files = event.target.files;
    if (files.length > 3) {
      alert('You can only upload 3 images!');
    } else {
      props.onImagesChange(files);
    }
  };

  // const setHours = time => {
  //   const hour = time === 'open' ? 9 : 17;
  //   let startTime = new Date();
  //   startTime.setHours(hour);
  //   startTime.setMinutes(0);
  //   return startTime;
  // };

  return (
    <form className="form form-create-place" onSubmit={onFormSubmission}>
      <MapSearch
        height={'20vh'}
        resultInfoHandler={(name, value) => props.onValueChange(name, value)}
        center={props.location}
      />
      <div className="input-group">
        <label htmlFor="input-name">Business Name</label>
        <input
          required
          placeholder="Enter Business Name"
          type="text"
          name="name"
          id="input-name"
          value={props.name}
          onChange={onValueChange}
        />
      </div>
      <div className="input-group">
        {/* Change to drop down */}
        <label htmlFor="input-category">Category</label>
        <select
          required
          placeholder="category"
          name="category"
          id="input-category"
          value={props.category}
          onChange={onValueChange}
        >
          <option hidden value=""></option>
          <option value="restaurant">Restaurant</option>
          <option value="bar">Bar</option>
          <option value="shop">Shop</option>
          <option value="grocery">Grocery Store</option>
          <option value="drugstore">Drugstore</option>
          <option value="bakery">Bakery</option>
          <option value="coffe_shop">Coffee Shop</option>
          <option value="antique">Antique</option>
          <option value="hotel">Hotel</option>
          <option value="hairdresser">Hairdresser</option>
          <option value="delicatessem">Delicatessen</option>
          <option value="butcher">Butcher</option>
          <option value="florist">Florist</option>
          <option value="car_workshop">Car workshop</option>
          <option value="atellier">Atellier</option>
          <option value="co_working">Co-working</option>
          <option value="ngo">NGO</option>
          <option value="jewerly">Jewerly</option>
          <option value="laundry">Laundry</option>
          <option value="keycutter">Keycutter</option>
          <option value="haberdasher">Haberdasher</option>
          <option value="funerary">Funerary</option>
          <option value="gallery">Gallery</option>
          <option value="clinic">Clinic</option>
          <option value="cellphone_suplier">Cellphone supplier</option>
          <option value="lottery">Lottery</option>
          <option value="newstand">Newstand</option>
          <option value="snack_bar">Snack bar</option>
          <option value="real_estate">Real Estate</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-group">
        <div className="create-place-title">
          <h1>Contacts</h1>
        </div>
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
        <div className="input-group" id="email">
          <label htmlFor="input-email">Email</label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="input-email"
            value={props.email}
            onChange={onValueChange}
          />
        </div>
        <div className="input-group" id="instagram">
          <label htmlFor="input-instagram">instagram</label>
          <input
            placeholder="instagram"
            type="instagram"
            name="instagram"
            id="input-instagram"
            value={props.instagram}
            onChange={onValueChange}
          />
        </div>
        <div className="input-group" id="website">
          <label htmlFor="input-website">website</label>
          <input
            placeholder="website"
            type="website"
            name="website"
            id="input-website"
            value={props.website}
            onChange={onValueChange}
          />
        </div>
      </div>
      <div className="input-group from-to-section">
        <label>Schedule</label>
        <div className="schedule-inputs-wrapper">
          <div>
            <label htmlFor="input-schedule-open">From:</label>
            <select
              selected=""
              onChange={onValueChange}
              name="weekDayOpen"
              id="input-schedule-open"
            >
              <option hidden value=""></option>
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
            <select
              selected=""
              onChange={onValueChange}
              name="weekDayClose"
              id="input-schedule-close"
            >
              <option hidden value=""></option>
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
            <label htmlFor="input-time">Opens:</label>
            <DatePicker
              // selected={props.openTime || setHours('open')}
              selected={props.openTime}
              onChange={date => props.onValueChange('openTime', date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
          <div>
            <label htmlFor="input-time">Closes:</label>
            <DatePicker
              // selected={props.closeTime || setHours('close')}
              selected={props.closeTime}
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
      <div className="create-place-title">
        <h1>Let's get relatable, tell locals more about your place!</h1>
      </div>
      <div className="input-group">
        <label htmlFor="input-description">Description:</label>
        <textarea
          onchange={onValueChange}
          name="description"
          id="input-description"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      {/* Separate into another form? */}
      <div className="input-group">
        <label htmlFor="input-openDate">It has been open since:</label>
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
      <div className="input-group">
        <label htmlFor="input-about">Tell us a bit about yourself!</label>
        <textarea
          onChange={onValueChange}
          name="about"
          id="input-about"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div className="create-place-title">
        <h1>Add recent photos and some important moments of your place!</h1>
        <div className="input-images__preview">
          <div className="input-image__img-wrapper">
            <img
              src={props.imagesPreview[0]}
              alt=""
              className="input-image__img"
            />
          </div>
          <div className="input-image__img-wrapper">
            <img
              src={props.imagesPreview[1]}
              alt=""
              className="input-image__img"
            />
          </div>
          <div className="input-image__img-wrapper">
            <img
              src={props.imagesPreview[2]}
              alt=""
              className="input-image__img"
            />
          </div>
        </div>
        <input
          onChange={handleImagesInputChange}
          type="file"
          name="images"
          accept="image/*"
          multiple
        />
      </div>
      <button type="submit" className="sign-button">
        Create Place
      </button>
    </form>
  );
};

export default PlaceForm;
