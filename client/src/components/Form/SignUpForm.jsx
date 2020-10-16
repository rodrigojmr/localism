import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AddressMap from '../Map/AddressMap';
import Button from '../../components/Button';
import createImagePreview from '../../services/createImagePreview';

const UserProfileForm = props => {
  const { register, handleSubmit, control, reset } = useForm();

  const [avatar, setAvatar] = useState('/images/default-avatar.png');
  const [avatarPreview, setavatarPreview] = useState(
    '/images/default-avatar.png'
  );

  const onSubmit = data => {
    console.log(data);
    // createPlace(data)
    //   .then(res => {
    //     const id = res.place._id;
    //     // Redirect user to single post view
    //     this.props.history.push(`/place/${id}`);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleAvatarChange = async e => {
    const file = e.target.files;
    const image = await createImagePreview(file, 1);
    setavatarPreview(image);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="user-profile-picture">
        <label htmlFor="input-avatar">
          <div className="image-cropper">
            <img src={avatarPreview} className="profile-pic" />
          </div>
          <input
            ref={register}
            style={{ display: 'none' }}
            id="input-avatar"
            type="file"
            name="avatar"
            onChange={handleAvatarChange}
            className="image-input"
          />
        </label>
        <div className="input-username">
          <label htmlFor="input-username">Username</label>
          <input
            ref={register({ required: true })}
            required
            minLength="3"
            id="input-username"
            type="text"
            name="username"
            placeholder="Enter a Username"
          />
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="input-name">Full Name</label>
        <input
          ref={register({ required: true })}
          id="input-name"
          type="text"
          name="name"
          placeholder="Enter Full Name"
        />
      </div>
      <div className="input-group">
        <label htmlFor="input-email">Email</label>
        <input
          ref={register({ required: true, pattern: emailRegex })}
          id="input-email"
          type="email"
          name="email"
          placeholder="Email"
        />
      </div>

      <div className="input-group">
        <label htmlFor="input-password">Password</label>
        <input
          ref={register({ required: true })}
          minLength="8"
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>

      <div className="input-group">
        <AddressMap ref={register} height={'40vh'} />
      </div>
      {props.error && (
        <div className="error-block">
          <p>There was an error submiting the form:</p>
          <p>{props.error.message}</p>
        </div>
      )}
      <Button>Sign Up</Button>
    </form>
  );
};

export default UserProfileForm;
