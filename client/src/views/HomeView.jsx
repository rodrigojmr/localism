import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Map from '../components/Map';
import PlacesList from '../components/List/PlacesList';
import PlaceForm from '../components/Form/PlaceForm';

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
        <h1>Home View</h1>
        <Map />
        <PlacesList />
        <Link to="/place/create">Create Place</Link>
      </div>
    );
  }
}

export default HomeView;
