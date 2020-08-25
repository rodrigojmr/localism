import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeMap from '../components/Map/HomeMap';
import PlacesList from '../components/List/PlacesList';
import { nearbyPlaces } from './../services/place';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      location: undefined,
      places: []
    };
  }

  handleContentChange() {}

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      function error(msg) {
        alert('Please enable your GPS position feature.');
      },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    );
  }

  getPlaces(boundaries) {
    nearbyPlaces(boundaries).then(data => {
      this.setState({
        places: data.places
      });
    });
  }

  render() {
    return (
      <div className="home">
        <PlacesList />
        <Link to="/place/create">Create Place</Link>
        <Link to="/support/create">Support a Place</Link>
        <Link to="/place/5f43a80be9227274903e3b42/support">
          Support Rodrigo's House
        </Link>
        <HomeMap
          places={this.state.places}
          idleMapSearch={boundaries => this.getPlaces(boundaries)}
          center={this.state.location}
        />
      </div>
    );
  }
}

export default HomeView;
