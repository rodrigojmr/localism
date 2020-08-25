import React, { Component } from 'react';
import { signUp } from './../../services/authentication';
import UserProfileForm from '../../components/User/UserProfileForm';

class AuthenticationSignUpView extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      avatarPreview: '/images/default-avatar.png',
      avatar: '',
      address: undefined
    };
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  emailValidation = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  handleFormSubmission = () => {
    const body = { ...this.state };
    signUp(body)
      .then(data => {
        const { user } = data;
        this.props.onUserUpdate(user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleAvatarInputChange = avatar => {
    console.log('avatar: ', avatar);
    this.setState({
      avatarPreview: URL.createObjectURL(avatar),
      avatar
    });
  };

  render() {
    return (
      <div>
<<<<<<< HEAD
        <UserProfileForm
          {...this.state}
          onDateChange={this.handleDateChange}
          onValueChange={this.handleValueChange}
          onAvatarChange={this.handleAvatarInputChange}
          onFormSubmission={this.handleFormSubmission}
        />
=======
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-avatar">
            <img src={this.state.avatarPreview} alt="" />
          </label>
          <input
            id="input-avatar"
            type="file"
            name="avatar"
            onChange={this.handleAvatarInputChange}
          />
          <div className="input-group">
            <label htmlFor="input-name">Name</label>
            <input
              id="input-name"
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="input-username">Username</label>
            <input
              id="input-username"
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="input-email">Email</label>
            <input
              id="input-email"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputChange}
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
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>

          <button>Sign Up</button>
        </form>
>>>>>>> 5982802407018e3de0009e9cd9b8db3cbe457e2a
      </div>
    );
  }
}

export default AuthenticationSignUpView;
