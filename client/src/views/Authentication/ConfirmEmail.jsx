import React, { useState, useEffect } from 'react';
import { confirmEmail } from './../../services/authentication';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

const ConfirmEmail = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleEmailConfirmation = async () => {
    const { token } = this.props.match.params;
    confirmEmail(token)
      .then(data => {
        setConfirmed(true);
        const { user, message } = data;
        setMessage(message);
      })
      .catch(error => {
        setError(error.response.data);
      });
  };

  useEffect(() => {
    handleEmailConfirmation();
  }, []);

  return (
    <div className="confirm">
      {error ? (
        <p>{error}</p>
      ) : confirmed ? (
        <>
          <p>{message}</p>
          <Link to="/">Home</Link>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ConfirmEmail;
