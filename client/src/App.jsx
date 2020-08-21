import React from 'react';
import './styles/style.scss';
import { Switch, Route, Link } from 'react-router-dom';
import HomeView from './views/HomeView';
import CreatePlace from './views/CreatePlace';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/place/create" exact component={CreatePlace} />
        <Route path="/" exact component={HomeView} />
      </Switch>
    </div>
  );
}

export default App;
