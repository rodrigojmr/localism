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
import ProtectedRoute from './components/ProtectedRoute';
import ErrorView from './views/ErrorView';
import ConfirmEmail from './views/Authentication/ConfirmEmail';

import Spinner from './components/Spinner';

import Navbar from './components/Navbar';
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
        <Navbar user={this.state.user} onSignOut={this.handleSignOut} />
        {(this.state.loaded && (
          <Switch>
            {/* Home */}
            <Route path="/" component={HomeView} exact />
            {/* Places */}
            <ProtectedRoute
              path="/place/create"
              render={props => (
                <CreatePlace user={this.state.user} {...props} />
              )}
              authorized={this.state.user}
              redirect="/authentication/sign-in"
            />
            <Route path="/place/:id" component={SinglePlace} exact />
            <ProtectedRoute
              path="/place/:id/support"
              render={props => <SupportPlaceView {...props} />}
              authorized={this.state.user}
              redirect="/authentication/sign-in"
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
              authorized={!this.state.user}
              redirect="/"
            />
            <ProtectedRoute
              path="/authentication/sign-in"
              render={props => (
                <AuthenticationSignInView
                  {...props}
                  onUserUpdate={this.handleUserUpdate}
                />
              )}
              authorized={!this.state.user}
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
            <Route path="/error" component={ErrorView} />
            {/* <Redirect from="/" to="/error" /> */}
            {/* <Route path="/authentication/sign-in" component={AuthenticationSignInView} /> */}
          </Switch>
        )) || (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}

export default App;
