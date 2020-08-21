import React from 'react';
import './styles/style.scss';
import { Switch, Route, Link } from 'react-router-dom';
import HomeView from './views/HomeView';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomeView} />
      </Switch>
    </div>
  );
}

export default App;
