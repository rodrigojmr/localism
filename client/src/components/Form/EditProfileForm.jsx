import React from 'react';
import AddressMap from '../Map/AddressMap';
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
    <form className="form form-profile" onSubmit={handleFormSubmission}>
      <div className="user-profile-picture">
        <label htmlFor="input-avatar">
          <div className="image-cropper">
            <img src={props.avatarPreview} alt="" />
          </div>
        </label>
        <input
          style={{ display: 'none' }}
          id="input-avatar"
          type="file"
          name="avatar"
          onChange={handleAvatarInputChange}
          className="image-input"
        />
        <div className="input-username">
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
      </div>
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
          className="input-group"
        />
      </div>
      <div className="input-group">
        <label htmlFor="input-gender">Gender</label>
        <select defaultValue="male" name="gender" id="input-gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="map-inputs">
        <AddressMap
          height={'30vh'}
          resultInfoHandler={(name, value) => props.onValueChange(name, value)}
          center={props.location}
        />
      </div>

      <button className="sign-button">
        {' '}
        {props.isEdit ? 'Save' : 'Sign Up'}{' '}
      </button>
    </form>
  );
};

export default UserProfileForm;
