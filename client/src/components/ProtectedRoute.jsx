import React, { useContext } from 'react';
import UserContext from './Context/UserContext';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, onUserUpdate, ...props }) => {
  let { currentUser } = useContext(UserContext);

  const whoToBlock = props.newUsers
    ? props.newUsers && !currentUser
    : currentUser;

  if (whoToBlock) {
    return (
      <Route
        {...props}
        render={props => <Component onUserUpdate={onUserUpdate} {...props} />}
      />
    );
  } else {
    return <Redirect to={props.newUsers ? '/' : '/authentication/sign-in'} />;
  }
};

export default ProtectedRoute;
