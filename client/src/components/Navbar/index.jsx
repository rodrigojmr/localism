import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <nav>
      <Link to='/'>Localista</Link>
      {(props.user && (
        <>
          <span>{props.user.username}</span>
          <button onClick={props.onSignOut}>Sign Out</button>
        </>
      )) || (
        <>
          <Link to='/authentication/sign-up'>Sign Up</Link>
          <Link to='/authentication/sign-in'>Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
