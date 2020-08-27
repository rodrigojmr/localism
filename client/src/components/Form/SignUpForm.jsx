import React from 'react';
import MapSearch from '../Map/MapSearch';

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
    <form onSubmit={handleFormSubmission} className="form">
      <div className="user-profile-picture">
        <label htmlFor="input-avatar">
          <div className="image-cropper">
            <img src={props.avatarPreview} alt={props.username} className="profile-pic" />
          </div>
          <input
            style={{ display: 'none' }}
            id="input-avatar"
            type="file"
            name="avatar"
            onChange={handleAvatarInputChange}
            className="image-input"
          />
        </label>
        <div className="input-username">
          <label htmlFor="input-username">Username</label>
          <input
            required
            minLength="3"
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
        <label htmlFor="input-name">Full Name</label>
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
          required
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={props.password}
          onChange={handleValueChange}
        />
      </div>

      <div className="map-input">
        <MapSearch
          height={'40vh'}
          resultInfoHandler={(name, value) => props.onValueChange(name, value)}
          center={props.location}
        />
      </div>
      {props.error && (
        <div className="error-block">
          <p>There was an error submiting the form:</p>
          <p>{this.state.error.message}</p>
        </div>
      )}
      <button className="sign-button"></button>
    </form>
  );
};

export default UserProfileForm;
