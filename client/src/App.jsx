import React, { Component } from 'react';
import './styles/style.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { loadProfile, signOut } from './services/authentication';
import HomeView from './views/HomeView';
import AuthenticationSignInView from './views/Authentication/SignInView';

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
    loadProfile()
      .then(data => {
        const user = data.user;
        this.handleUserUpdate(user);
        this.setState({
          loaded: true
        });
      })
      .then(error => {
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
      <div className='App'>
        <BrowserRouter>
          <Navbar user={this.state.user} onSignOut={this.handleSignOut} />
          <Switch>
            <Route path='/' component={HomeView} exact />
            <Route
              path='/authentication/sign-in'
              component={AuthenticationSignInView}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
