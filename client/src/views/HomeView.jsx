import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeMap from '../components/Map/HomeMap';
import PlacesList from '../components/List/PlacesList';
import SearchName from './../components/Search/SearchName';
import { nearbyPlaces } from './../services/place';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      location: undefined,
      locality: undefined,
      places: [],
      filteredPlaces: [],
      searchQuery: ''
    };
  }

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
    this.handleSearch(this.state.searchQuery);
  }

  handleLocalityUpdate(locality) {
    this.setState({
      locality
    });
  }

  handleSearch = searchQuery => {
    const filteredPlaces = this.state.places.filter(place =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    this.setState({
      searchQuery,
      filteredPlaces
    });
  };

  render() {
    return (
      <div className="home">
        <PlacesList />
        <Link to="/place/create">Create Place</Link>
        <Link to="/place/5f43a80be9227274903e3b42/support">
          Support Rodrigo's House
        </Link>
        <HomeMap
          locality={this.state.locality}
          places={
            this.state.filteredPlaces.length
              ? this.state.filteredPlaces
              : this.state.places
          }
          center={this.state.location}
          onLocalityUpdate={locality => this.handleLocalityUpdate(locality)}
          idleMapSearch={boundaries => this.getPlaces(boundaries)}
        />
        <SearchName
          onSearchUpdate={searchQuery => this.handleSearch(searchQuery)}
          searchQuery={this.state.searchQuery}
          places={this.props.places}
        />
      </div>
    );
  }
}

export default HomeView;
