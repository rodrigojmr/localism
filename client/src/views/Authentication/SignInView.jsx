import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { signIn } from './../../services/authentication';
import Button from '../../components/Button';
import UserContext from '../../components/Context/UserContext';

const AuthenticationSignInView = () => {
  const { currentUser, setUser } = useContext(UserContext);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async data => {
    console.log('data: ', data);
    signIn(data)
      .then(data => {
        const { user } = data;
        setUser(user);
        history.push(`/profile/${user._id}`);
      })
      .catch(error => {
        setError(error.response.data);
      });
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-title">
        <h1>Ready to get</h1>
        <h1>Local?</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="input-username">Username</label>
          <input
            ref={register({ required: true })}
            id="input-username"
            type="text"
            name="username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="input-password">Password</label>
          <input
            ref={register({ required: true })}
            id="input-password"
            type="password"
            name="password"
            minLength="8"
          />
        </div>
        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error}</p>
          </div>
        )}
        <div className="sign-buttons">
          <Button>Sign In</Button>
          <Link to={'/authentication/sign-up'}>
            <Button importance="primary">Sign Up</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthenticationSignInView;
