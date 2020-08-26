import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeMap from '../components/Map/HomeMap';
import PlacesList from '../components/List/PlacesList';
import SearchName from './../components/Search/SearchName';
import { nearbyPlaces } from './../services/place';
import getHours from 'date-fns/getHours';

const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz');

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      location: undefined,
      locality: undefined,
      places: [],
      filteredPlaces: [],
      searchQuery: '',
      selectedPlace: null
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

  handlePlaceSelection(place) {
    this.setState({
      selectedPlace: place
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
    const selected = this.state.selectedPlace;
    let openTime, closeTime;

    if (selected) {
      if (selected.schedule.time.openTime) {
        openTime = getHours(
          utcToZonedTime(selected.schedule.time.openTime, 'Europe/Lisbon')
        );
      }
      if (selected.schedule.time.closeTime) {
        closeTime = getHours(
          utcToZonedTime(selected.schedule.time.closeTime, 'Europe/Lisbon')
        );
      }
    }

    return (
      <div className="home">
        <PlacesList />
        {this.props.user && <Link to="/place/create">Create Place</Link>}
        <HomeMap
          locality={this.state.locality}
          places={
            this.state.searchQuery
              ? this.state.filteredPlaces
              : this.state.places
          }
          selected={this.state.selectedPlace}
          center={this.state.location}
          handlePlaceSelection={place => this.handlePlaceSelection(place)}
          onLocalityUpdate={locality => this.handleLocalityUpdate(locality)}
          idleMapSearch={boundaries => this.getPlaces(boundaries)}
        />
        <SearchName
          onSearchUpdate={searchQuery => this.handleSearch(searchQuery)}
          searchQuery={this.state.searchQuery}
          places={this.props.places}
        />
        {selected && (
          <div className="place-info-mini">
            <div className="place-info-mini__img-wrapper">
              <img
                src={selected.images[0]}
                alt={selected.name}
                className="place-info-mini__img"
              />
            </div>
            <div className="place-info-mini__description">
              <h1 className="heading heading--1">{selected.name}</h1>
              <h3>{`#${selected.category.split(' ').join('_')}`}</h3>
              {selected.schedule.time.openTime &&
                selected.schedule.time.closeTime && (
                  <p>
                    {`Schedule: ${openTime}h - ${closeTime}h from ${selected.schedule.from} to ${selected.schedule.to}`}
                  </p>
                )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HomeView;
