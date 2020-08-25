import React from 'react';
import MapBackup from '../Map/MapBackup';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserProfileForm = props => {
  const handleFormSubmission = event => {
    event.preventDefault();
    props.onFormSubmission();
  };

  const handleValueChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    props.onValueChange(name, value);
  };

  const handleAvatarInputChange = event => {
    const file = event.target.files[0];
    props.onAvatarChange(file);
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <label htmlFor="input-avatar">
        <img src={props.avatar} alt="" />
      </label>
      <input
        id="input-avatar"
        type="file"
        name="avatar"
        onChange={handleAvatarInputChange}
      />
      <div className="input-group">
        <label htmlFor="input-name">FullName</label>
        <input
          id="input-name"
          type="text"
          name="name"
          placeholder="Enter Full Name"
          value={props.name}
          onChange={handleValueChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="input-username">Username</label>
        <input
          id="input-username"
          type="text"
          name="username"
          placeholder="Enter a Username"
          value={props.username}
          onChange={handleValueChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="email"
          name="email"
          placeholder="Email"
          value={props.email}
          onChange={handleValueChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="input-password">Password</label>
        <input
          minLength="8"
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={props.password}
          onChange={handleValueChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="input-openDate">Birthday</label>
        <DatePicker
          id="input-birthday"
          value={
            props.birthday
              ? format(props.birthday, 'dd-MM-yyyy')
              : props.birthday
          }
          dateFormat={'dd/MM/yyyy'}
          onChange={date => props.onValueChange('birthday', date)}
        />
      </div>
      <div className="input-group">
        <label>Gender</label>
        <div className="gender-inputs-wrapper">
          <div>
            <label htmlFor="input-gender">From:</label>
            <select defaultValue="male" name="gender" id="input-gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
      <div className="map-input">
        <p>Find Location on Map </p>
        <MapBackup />
      </div>

      <button> {props.isEdit ? 'Edit Profile' : 'Sign Up'} </button>
    </form>
  );
};

export default UserProfileForm;
