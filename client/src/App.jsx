import React, { Component } from 'react';
import './styles/style.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { loadMe, signOut } from './services/authentication';
import HomeView from './views/HomeView';
import CreatePlace from './views/CreatePlace';
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
    loadMe()
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
      <div className="App">
        <BrowserRouter>
          <Navbar user={this.state.user} onSignOut={this.handleSignOut} />
          {this.state.loaded && (
            <Switch>
              <Route path="/" component={HomeView} exact />
              <Route path="/place/create" exact component={CreatePlace} />
              <Route
                path="/authentication/sign-in"
                component={AuthenticationSignInView}
              />
            </Switch>
          )}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
