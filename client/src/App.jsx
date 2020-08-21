import React from 'react';
import './styles/style.scss';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { loadProfile, signOut } from './services/authentication';
import HomeView from './views/HomeView';
import CreatePlace from './views/CreatePlace';
import AuthenticationSignInView from './views/Authentication/SignInView';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/place/create" exact component={CreatePlace} />
          <Route
            path="/authentication/sign-in"
            exact
            component={AuthenticationSignInView}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
