import React, { Component } from 'react';
import UserForm from '../../components/Form/UserForm';

class AuthenticationSignUpView extends Component {
  render() {
    return (
      <>
        <div className="sign-up-page">
          <h1>Be local, sign up!</h1>
          <UserForm />
        </div>
      </>
    );
  }
}

export default AuthenticationSignUpView;
