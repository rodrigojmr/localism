import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeMap from '../components/Map/HomeMap';
import PlacesList from '../components/List/PlacesList';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      places: []
    };
  }

  handleContentChange() {}

  componentDidMount() {}

  render() {
    return (
      <div className="home">
        <PlacesList />
        <Link to="/place/create">Create Place</Link>
        <Link to="/support/create">Support a Place</Link>
        <Link to="/place/5f43a80be9227274903e3b42/support">
          Support Rodrigo's House
        </Link>
        <HomeMap />
      </div>
    );
  }
}

export default HomeView;
