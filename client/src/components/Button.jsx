import React from 'react';

const Button = ({ importance, children }) => {
  return (
    <button className={`btn ${importance ? `btn--${importance}` : ''}`}>
      {children}
    </button>
  );
};

export default Button;
