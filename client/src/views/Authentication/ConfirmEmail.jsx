import React, { Component } from 'react';
import { confirmEmail } from './../../services/authentication';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

export class ConfirmEmail extends Component {
  constructor() {
    super();
    this.state = {
      confirming: true,
      message: '',
      error: null
    };
  }

  handleEmailConfirmation = async () => {
    const { token } = this.props.match.params;
    confirmEmail(token)
      .then(data => {
        const { user, message } = data;
        this.props.onUserUpdate(user);
        this.setState({
          confirming: false,
          message
        });
      })
      .catch(error => {
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
      });
  };

  componentDidMount() {
    this.handleEmailConfirmation();
  }

  render() {
    return (
      <div className="confirm">
        {this.state.confirming ? (
          <Spinner />
        ) : (
          <>
            <p>{this.state.message}</p>
            <Link to="/">Home</Link>
          </>
        )}
      </div>
    );
  }
}

export default ConfirmEmail;
