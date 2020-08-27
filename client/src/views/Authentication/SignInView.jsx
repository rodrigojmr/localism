import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from './../../services/authentication';

class AuthenticationSignInView extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: null
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const body = { username, password };
    signIn(body)
      .then(data => {
        const { user } = data;
        this.props.onUserUpdate(user);
      })
      .catch(error => {
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
      });
  };

  render() {
    return (
      <div className='sign-in-page'>
        <div className='sign-in-title'>
          <h1>Ready to get</h1>
          <br></br>
          <h1>Local?</h1>
        </div>
        <form onSubmit={this.handleFormSubmission}>
          <div className='input-group'>
            <label htmlFor='input-username'>Username</label>
            <input
              id='input-username'
              type='text'
              name='username'
              placeholder='write an username'
              value={this.state.username}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className='input-group'>
            <label htmlFor='input-password'>Password</label>
            <input
              id='input-password'
              type='password'
              name='password'
              placeholder='use a strong password'
              value={this.state.password}
              onChange={this.handleInputChange}
              required
              minLength='8'
            />
          </div>
          {this.state.error && (
            <div className='error-block'>
              <p>There was an error submiting the form:</p>
              <p>{this.state.error.message}</p>
            </div>
          )}
          <div className='sign-up-title'>
            <h2>If you're new here,</h2>
            <Link to={'/authentication/sign-up'}>
              <h2>Sign Up!</h2>
            </Link>
          </div>
          <button className='sign-button'>Get In</button>
        </form>
      </div>
    );
  }
}

export default AuthenticationSignInView;
