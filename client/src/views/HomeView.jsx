import React, { Component } from 'react';
import Map from '../components/Map';
import PlacesList from '../components/List/PlacesList';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      places: []
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="home">
        <Map />
        <PlacesList />
      </div>
    );
  }
}

export default HomeView;
