import React, { useState, useEffect } from 'react';
import './styles/style.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { loadMe, signOut } from './services/authentication';

import Routes from './Routes';

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
import UserContext from './components/Context/UserContext';
import Spinner from './components/Spinner';

const App = () => {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    loadMe()
      .then(data => {
        setUser(data.user);
        setLoaded(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut()
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const style = {
    height: window.innerHeight
  };

  return (
    <div style={style} className="App">
      <UserContext.Provider value={{ currentUser: user, setUser }}>
        <div className="desktop-blocker">
          <p>For now, this app is mobile-only. Check it out!</p>
          <img className="qr-code" src="/images/qr-code.png" alt="QR Code" />
        </div>
        <main className="content">
          {(loaded && <Routes />) || (
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
        <Navbar onSignOut={handleSignOut} />
      </UserContext.Provider>
    </div>
  );
};

export default App;
