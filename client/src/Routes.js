import React, { Suspense, lazy } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import HomeView from './views/HomeView';
import CreatePlace from './views/Place/CreatePlace';
import SinglePlace from './views/Place/SinglePlace';
import PlacesList from './views/Place/PlacesList';
import AuthenticationSignInView from './views/Authentication/SignInView';
import AuthenticationSignUpView from './views/Authentication/SignUpView';
import EditProfileView from './views/User/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorView from './views/ErrorView';
import ConfirmEmail from './views/Authentication/ConfirmEmail';
import UserProfile from './views/User/UserProfile';
import Spinner from './components/Spinner';

const Routes = () => {
  return (
    <Suspense fallback={Spinner}>
      <Switch>
        {/* Home */}
        <Route path="/" component={HomeView} exact />
        <Route path="/places/" component={PlacesList} exact />
        <ProtectedRoute
          path="/place/create"
          component={CreatePlace}
          redirect="/authentication/sign-in"
          exact
        />
        <Route path="/place/:id" component={SinglePlace} exact />
        {/* User Authentication */}
        <ProtectedRoute
          newUsers
          path="/authentication/sign-in"
          component={AuthenticationSignInView}
          exact
        />
        <ProtectedRoute
          newUsers
          path="/authentication/sign-up"
          component={AuthenticationSignUpView}
          exact
        />
        <Route
          path="/authentication/confirmation/:token"
          render={ConfirmEmail}
          redirect="/"
        />{' '}
        {/*Profile route */}
        <ProtectedRoute
          path="/profile/edit"
          component={EditProfileView}
          exact
        />
        <Route path="/profile/:id" component={UserProfile} exact />
        {/* Error */}
        <Route render={() => <Redirect to="/" />} />
        <Route path="/error" component={ErrorView} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
