import React, { Component } from 'react';
import { signUp } from './../../services/authentication';
import SignUpForm from '../../components/Form/SignUpForm';

class AuthenticationSignUpView extends Component {
  render() {
    return (
      <>
        <div className="sign-up-page">
          <h1>Be local, sign up!</h1>
          <SignUpForm />
        </div>
      </>
    );
  }
}

export default AuthenticationSignUpView;
