import React, { Component } from 'react';
import './styles/style.scss';
import { Redirect, Switch, Route } from 'react-router-dom';
import { loadMe, signOut } from './services/authentication';
import HomeView from './views/HomeView';
import CreatePlace from './views/Place/CreatePlace';

import SupportCreationView from './views/Support/SupportCreationView';
import SupportPlaceView from './views/Support/SupportPlaceView';
import SinglePlace from './views/Place/SinglePlace';
import AuthenticationSignInView from './views/Authentication/SignInView';
import AuthenticationSignUpView from './views/Authentication/SignUpView';
import EditProfileView from './views/User/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorView from './views/ErrorView';
import ConfirmEmail from './views/Authentication/ConfirmEmail';

import Spinner from './components/Spinner';

import Navbar from './components/Navbar.jsx';
import Header from './components/Header.jsx';
import UserProfile from './views/User/UserProfile';
//import ProtectedRoute from './components/ProtectedRoute';

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
    return (
      <div className="App">
        <main className="content">
          {(this.state.loaded && (
            <Switch>
              {/* Home */}
              <Route
                path="/"
                render={props => <HomeView user={this.state.user} {...props} />}
                exact
              />
              {/* Places */}
              <ProtectedRoute
                path="/place/create"
                render={props => (
                  <CreatePlace user={this.state.user} {...props} />
                )}
                user={this.state.user}
                redirect="/authentication/sign-in"
                exact
              />
              <Route
                path="/places/"
                render={props => (
                  <SinglePlace user={this.state.user} {...props} />
                )}
                exact
              />
              <Route
                path="/place/:id"
                render={props => (
                  <SinglePlace user={this.state.user} {...props} />
                )}
                exact
              />
              <ProtectedRoute
                path="/place/:id/support"
                render={props => (
                  <SupportPlaceView user={this.state.user} {...props} />
                )}
                user={this.state.user}
                redirect="/authentication/sign-in"
                exact
              />
              {/* User Authentication */}
              <ProtectedRoute
                path="/authentication/sign-up"
                render={props => (
                  <AuthenticationSignUpView
                    {...props}
                    onUserUpdate={this.handleUserUpdate}
                  />
                )}
                user={!this.state.user}
                redirect={
                  this.state.user ? `/profile/${this.state.user._id}` : `/`
                }
              />
              <ProtectedRoute
                path="/authentication/sign-in"
                render={props => (
                  <AuthenticationSignInView
                    {...props}
                    onUserUpdate={this.handleUserUpdate}
                  />
                )}
                user={!this.state.user}
                redirect="/"
              />
              <Route
                path="/authentication/confirmation/:token"
                render={props => (
                  <ConfirmEmail
                    {...props}
                    onUserConfirmation={this.handleUserUpdate}
                  />
                )}
                redirect="/"
              />{' '}
              {/*Profile route */}
              <Route
                path="/profile/:id"
                user={this.state.user}
                component={UserProfile}
                exact
              />
              <ProtectedRoute
                path="/profile/edit"
                render={props => (
                  <EditProfileView
                    user={this.state.user}
                    {...props}
                    onUserUpdate={this.handleUserUpdate}
                  />
                )}
                user={this.state.user}
                redirect="/"
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
        <Navbar user={this.state.user} onSignOut={this.handleSignOut} />
      </div>
    );
  }
}

export default App;
