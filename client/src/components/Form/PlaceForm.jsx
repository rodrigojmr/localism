import React, { useState, useEffect } from 'react';
import AddressMap from '../Map/AddressMap';
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, Controller } from 'react-hook-form';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Button from '../Button';
import { createPlace } from '../../services/place';
import createImagePreview from '../../services/createImagePreview';

export const PlaceForm = props => {
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState(null);

  const handleImagesChange = async event => {
    const files = event.target.files;
    const urlsArray = await createImagePreview(files, 3);
    setImages(urlsArray);
  };

  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { register, handleSubmit, control, reset } = useForm();

  const imagePreviews = images.map((image, i) => (
    <div key={i} className="input-image__img-wrapper">
      <img src={image} alt="" className="input-image__img" />
    </div>
  ));

  const onSubmit = data => {
    const dataWithAddress = Object.assign(data, address);
    createPlace(dataWithAddress)
      .then(res => {
        const id = res.place._id;
        // Redirect user to single post view
        this.props.history.push(`/place/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <form className="form form-create-place" onSubmit={handleSubmit(onSubmit)}>
      <AddressMap setAddress={setAddress} ref={register} height={'30vh'} />
      <div className="form__input-group">
        <label htmlFor="input-name">Business Name</label>
        <input
          ref={register({ required: true })}
          required
          placeholder="Enter Business Name"
          type="text"
          name="name"
          id="input-name"
        />
      </div>
      <div className="form__input-group">
        {/* Change to drop down */}
        <label htmlFor="input-category">Category</label>
        <select
          ref={register}
          required
          placeholder="category"
          name="category"
          id="input-category"
        >
          <option hidden value=""></option>
          <option value="antique_shop">Antique Shop</option>
          <option value="atellier">Atellier</option>
          <option value="bakery">Bakery</option>
          <option value="bar">Bar</option>
          <option value="butcher">Butcher</option>
          <option value="car_workshop">Car Workshop</option>
          <option value="clinic">Clinic</option>
          <option value="co_working">Co-working</option>
          <option value="coffe_shop">Coffee Shop</option>
          <option value="computer_store">Computer Store</option>
          <option value="delicatessem">Delicatessen</option>
          <option value="drugstore">Drugstore</option>
          <option value="florist">Florist</option>
          <option value="gallery">Gallery</option>
          <option value="grocery">Grocery Store</option>
          <option value="haberdasher">Haberdasher</option>
          <option value="hairdresser">Hairdresser</option>
          <option value="hotel">Hotel</option>
          <option value="jewerly">Jewerly</option>
          <option value="keycutter">Keycutter</option>
          <option value="laundry">Laundry</option>
          <option value="lottery">Lottery</option>
          <option value="newstand">Newstand</option>
          <option value="ngo">NGO</option>
          <option value="real_estate">Real Estate</option>
          <option value="restaurant">Restaurant</option>
          <option value="shop">Shop</option>
          <option value="snack_bar">Snack bar</option>
          <option value="venue">Venue</option>
          <option value="other">Other</option>
        </select>
      </div>
      <h2 className="heading heading--2 form__section-title">Contacts</h2>
      <div className="form__input-group">
        <label htmlFor="input-phoneNumber">Phone Number</label>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{ required: false, maxLength: 15, pattern: phoneRegex }}
          as={
            <PhoneInput
              placeholder="Enter phone number"
              inputRef={register}
              id="input-phoneNumber"
            />
          }
        />
      </div>
      <div className="form__input-group" id="email">
        <label htmlFor="input-email">Email</label>
        <input
          ref={register({ pattern: emailRegex })}
          placeholder="Email"
          type="email"
          name="email"
          id="input-email"
        />
      </div>
      <div className="form__input-group" id="instagram">
        <label htmlFor="input-instagram">instagram</label>
        <input
          ref={register}
          placeholder="instagram"
          type="instagram"
          name="instagram"
          id="input-instagram"
        />
      </div>
      <div className="form__input-group" id="website">
        <label htmlFor="input-website">website</label>
        <input
          ref={register}
          placeholder="website"
          type="website"
          name="website"
          id="input-website"
        />
      </div>
      <h2 className="heading heading--2 form__section-title">Schedule</h2>
      <div className="form__input-group from-to-section">
        <div className="form__schedule">
          <div className="form__schedule-section">
            <div>
              <label htmlFor="input-schedule-open">From:</label>
              <select
                ref={register}
                selected=""
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
                ref={register}
                selected="monday"
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
          </div>
          <div className="form__schedule-section">
            <div>
              <label htmlFor="input-time">Opens:</label>
              <Controller
                defaultValue={new Date(2020, 0, 0, 9, 0, 0)}
                control={control}
                name="openTime"
                render={({ onChange, onBlur, value }) => (
                  <ReactDatePicker
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    popperPlacement="auto"
                    dropdownMode="select"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    shouldCloseOnSelect
                    placeholderText="Click to select time"
                    control={control}
                  />
                )}
              />
            </div>
            <div>
              <label htmlFor="input-time">Closes:</label>
              <Controller
                defaultValue={new Date(2020, 0, 0, 18, 0, 0)}
                control={control}
                name="closeTime"
                render={({ onChange, onBlur, value }) => (
                  <ReactDatePicker
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    popperPlacement="auto"
                    dropdownMode="select"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    shouldCloseOnSelect
                    placeholderText="Click to select time"
                    control={control}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="heading heading--2">
        Let's get relatable, tell locals more about your place!
      </h2>
      <div className="form__input-group">
        <label htmlFor="input-description">Description:</label>
        <textarea
          ref={register({ required: true })}
          name="description"
          id="input-description"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      {/* Separate into another form? */}
      <div className="form__input-group">
        <label htmlFor="input-openDate">It has been open since:</label>
        <Controller
          defaultValue={new Date(2020, 0, 0, 9, 0, 0)}
          control={control}
          name="openDate"
          id="input-openDate"
          render={({ onChange, onBlur, value }) => (
            <ReactDatePicker
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              showMonthDropdown
              showYearDropdown
              popperPlacement="auto"
              dropdownMode="select"
              timeCaption="Date"
              dateFormat={'dd/MM/yyyy'}
              shouldCloseOnSelect
              placeholderText="Select a date"
              control={control}
            />
          )}
        />
      </div>
      <div className="form__input-group">
        <label htmlFor="input-about">Tell us a bit about yourself!</label>
        <textarea
          ref={register}
          name="about"
          id="input-about"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <h2 className="heading heading--2 u-margin-bottom-small">
        Add recent photos and some important moments of your place!
      </h2>
      {images.length > 0 && (
        <div className="input-images__preview">{imagePreviews}</div>
      )}
      <input
        ref={register}
        onChange={handleImagesChange}
        type="file"
        name="images"
        accept="image/*"
        multiple
      />
      <Button>Create Place</Button>
    </form>
  );
};

export default PlaceForm;
