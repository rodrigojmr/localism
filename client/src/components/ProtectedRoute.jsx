import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ ...props }) => {
  if (props.user) {
    return <Route {...props} />;
  } else {
    return <Redirect to={props.redirect} />;
  }
};

export default ProtectedRoute;
