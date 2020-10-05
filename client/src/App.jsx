import React, { Component, useState, useEffect } from 'react';
import './styles/style.scss';
import { Switch, Route } from 'react-router-dom';
import { loadMe, signOut } from './services/authentication';

import HomeView from './views/HomeView';
import Navbar from './components/Navbar.jsx';
import CreatePlace from './views/Place/CreatePlace';
import SupportPlaceView from './views/Support/SupportPlaceView';
import SinglePlace from './views/Place/SinglePlace';
import PlacesList from './views/Place/PlacesList';
import AuthenticationSignInView from './views/Authentication/SignInView';
import AuthenticationSignUpView from './views/Authentication/SignUpView';
import EditProfileView from './views/User/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorView from './views/ErrorView';
import ConfirmEmail from './views/Authentication/ConfirmEmail';
import UserProfile from './views/User/UserProfile';
import { UserContext } from './components/Context/UserContext';
import Spinner from './components/Spinner';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null
    };
  }

  componentDidMount() {
    loadMe()
      .then(data => {
        const user = data.user;
        this.handleUserUpdate(user);
        this.setState({
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleUserUpdate = user => {
    this.setState({
      user
    });
  };

  handleSignOut = () => {
    signOut()
      .then(() => {
        this.handleUserUpdate(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const style = {
      height: window.innerHeight
    };
    const user = this.state.user;

    return (
      <div style={style} className="App">
        <UserContext.Provider value={user}>
          <div className="desktop-blocker">
            This app was developed mobile-first. Please view this app on your
            mobile browser.
          </div>
          <main className="content">
            {(this.state.loaded && (
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
                {/* Protected Routes */}
                <ProtectedRoute
                  path="/place/:id/support"
                  component={SupportPlaceView}
                  onUserUpdate={this.handleUserUpdate}
                  exact
                />
                {/* User Authentication */}
                <ProtectedRoute
                  path="/authentication/sign-in"
                  component={AuthenticationSignInView}
                  onUserUpdate={this.handleUserUpdate}
                  exact
                />
                <Route
                  path="/authentication/confirmation/:token"
                  render={props => (
                    <ConfirmEmail
                      {...props}
                      onUserUpdate={this.handleUserUpdate}
                    />
                  )}
                  redirect="/"
                />{' '}
                {/*Profile route */}
                <ProtectedRoute
                  path="/profile/edit"
                  component={EditProfileView}
                  onUserUpdate={this.handleUserUpdate}
                  exact
                />
                <Route
                  path="/profile/:id"
                  user={user}
                  component={UserProfile}
                  exact
                />
                {/* Error */}
                <Route path="/error" component={ErrorView} />
                {/* <Redirect from="/" to="/error" /> */}
                {/* <Route path="/authentication/sign-in" component={AuthenticationSignInView} /> */}
              </Switch>
            )) || (
              <div className="loading">
                <img
                  className="loading-logo"
                  src="/images/logo.svg"
                  alt="Localista"
                />
                <Spinner />
              </div>
            )}
          </main>
          <Navbar onSignOut={this.handleSignOut} />
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
