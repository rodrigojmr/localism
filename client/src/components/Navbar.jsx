import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  const user = props.user;
  return (
    <nav>
      <Link to="/">Localista</Link>

      {(user && (
        <>
          <Link to={`/profile/${user._id}`}>Profile</Link>
          <Link to="/me/edit">Edit Profile</Link>
          <button onClick={props.onSignOut}>Sign Out</button>
        </>
      )) || (
        <>
          <Link to="/authentication/sign-up">Sign Up</Link>
          <Link to="/authentication/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
