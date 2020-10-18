import React, { useState, useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AddressMap from '../Map/AddressMap';
import Button from '../Button';
import createImagePreview from '../../services/createImagePreview';
import { signUp } from '../../services/authentication';
import { editProfile } from '../../services/user';
import UserContext from '../Context/UserContext';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router-dom';

const UserForm = props => {
  const history = useHistory();
  const { register, handleSubmit, control, reset } = useForm();

  const [avatarPreview, setavatarPreview] = useState(
    '/images/default-avatar.png'
  );
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);

  const { currentUser, setUser } = useContext(UserContext);

  useEffect(() => {
    if (props.preloadValues) {
      setavatarPreview(props.preloadValues.avatar);
      delete props.preloadValues.avatar;
      reset(props.preloadValues);
    }
  }, [props.preloadValues]);

  const onSubmit = async data => {
    const formData = Object.assign(data, address);
    let userData;
    try {
      if (props.edit) {
        userData = await editProfile(currentUser._id, formData);
      } else {
        userData = await signUp(formData);
      }
      console.log('userData: ', userData);
      const { user } = userData;
      setUser(user);
      history.push(`/profile/${user._id}`);
    } catch (error) {
      console.log('error: ', error);
      setError(error?.response?.data?.error);
    }
  };

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleAvatarChange = async e => {
    const file = e.target.files;
    const image = await createImagePreview(file, 1);
    setavatarPreview(image);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="input-group form__avatar-input">
        <label htmlFor="input-avatar">
          <div className="image-cropper">
            <img
              src={avatarPreview}
              alt="New user avatar"
              className="profile-pic"
            />
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
      </div>
      <div className="input-group">
        <label htmlFor="input-username">Username</label>
        <input
          ref={register({ required: !props.edit })}
          minLength="3"
          id="input-username"
          type="text"
          name="username"
          placeholder="Enter a Username"
        />
      </div>

      <div className="input-group">
        <label htmlFor="input-name">Full Name</label>
        <input
          ref={register({ required: !props.edit })}
          id="input-name"
          type="text"
          name="name"
          placeholder="Enter Full Name"
        />
      </div>
      <div className="input-group">
        <label htmlFor="input-email">Email</label>
        <input
          ref={register({ required: !props.edit, pattern: emailRegex })}
          id="input-email"
          type="email"
          name="email"
          placeholder="Email"
        />
      </div>

      <div className="input-group">
        <label htmlFor="input-password">Password</label>
        <input
          ref={register({ required: !props.edit })}
          minLength="8"
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      {props.edit && (
        <>
          <div className="input-group">
            <label htmlFor="input-birthday">Birthday</label>
            <Controller
              control={control}
              id="input-birthday"
              name="birthday"
              defaultValue={new Date(95, 0)}
              render={({ onChange, onBlur, value }) => (
                <ReactDatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  popperPlacement="auto"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  timeCaption="Date"
                  dateFormat="MM/yyyy"
                  shouldCloseOnSelect
                  placeholderText="Select your birth date"
                  control={control}
                />
              )}
            />
          </div>
          <div className="input-group">
            <label htmlFor="input-gender">Gender</label>
            <select
              defaultValue="male"
              name="gender"
              id="input-gender"
              ref={register}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </>
      )}
      <div className="input-group">
        <AddressMap setAddress={setAddress} ref={register} height={'40vh'} />
      </div>
      {error && (
        <div className="error-block">
          <p>There was an error submiting the form:</p>
          <p>{error.message}</p>
        </div>
      )}
      <Button>{props.edit ? 'Edit' : 'Sign Up'}</Button>
    </form>
  );
};

export default UserForm;
