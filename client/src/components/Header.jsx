import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img className="logo" src="/images/logo.png" alt="Logo" />
      </Link>
    </header>
  );
};

export default Header;
