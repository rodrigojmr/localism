import React, { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, onUserUpdate, ...props }) => {
  const user = useContext(UserContext);

  if (!user) {
    return (
      <Route
        {...props}
        render={props => <Component onUserUpdate={onUserUpdate} {...props} />}
      />
    );
  } else {
    return <Redirect to="/" />;
  }
};

// const ProtectedRoute = ({ component: Component, ...props }) => {
//   console.log('Component: ', Component);
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         props.user ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/authentication/sign-in" />
//         )
//       }
//     />
//   );
// };

export default ProtectedRoute;
