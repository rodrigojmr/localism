import React, { Component } from 'react';
import { signUp } from './../../services/authentication';

class AuthenticationSignUpView extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      avatar: '/images/default-avatar.png',
      address: undefined
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  emailValidation = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  handleFormSubmission = event => {
    event.preventDefault();
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

  handleAvatarInputChange = event => {
    const avatar = event.target.files[0];
    console.log('avatar: ', avatar);
    this.setState({
      avatar
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-avatar">
            <img src={this.state.avatar} alt="" />
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
      </div>
    );
  }
}

export default AuthenticationSignUpView;
