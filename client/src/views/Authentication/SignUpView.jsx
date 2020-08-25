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
      avatar: '/images/default-avatar.png',
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
      avatar
    });
  };

  render() {
    return (
      <div>
        <UserProfileForm
          {...this.state}
          onDateChange={this.handleDateChange}
          onValueChange={this.handleValueChange}
          onAvatarChange={this.handleAvatarInputChange}
          onFormSubmission={this.handleFormSubmission}
        />
      </div>
    );
  }
}

export default AuthenticationSignUpView;
