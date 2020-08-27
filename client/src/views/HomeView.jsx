import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeMap from '../components/Map/HomeMap';
import PlacesList from '../components/List/PlacesList';
import SearchName from './../components/Search/SearchName';
import { nearbyPlaces, localityPlaces } from './../services/place';
import getHours from 'date-fns/getHours';

const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz');

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      location: null,
      locality: undefined,
      places: [],
      filteredPlaces: [],
      searchQuery: '',
      selectedPlace: null
    };
    this.searchWrapper = React.createRef();
    this.placeInfoWrapper = React.createRef();
  }

  componentDidMount() {
    this.getLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.locality !== this.state.locality) {
      this.getLocalityPlaces(this.state);
    }
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

  getBoundaryPlaces(boundaries) {
    nearbyPlaces(boundaries).then(data => {
      this.setState({
        places: data.places
      });
    });
    this.handleSearch(this.state.searchQuery);
  }

  getLocalityPlaces() {
    if (this.state.locality) {
      localityPlaces(this.state.locality).then(data => {
        this.setState({
          places: data.places
        });
      });
    }
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

    const placeInfoWrapper = this.placeInfoWrapper.current;
    if (place) {
      placeInfoWrapper.classList.add('place-info-mini--expanded');
      this.setState({
        location: {
          lat: place.location.coordinates[0],
          lng: place.location.coordinates[1]
        }
      });
    } else {
      placeInfoWrapper.classList.remove('place-info-mini--expanded');
    }
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

  toggleSearch() {
    const searchWrapper = this.searchWrapper.current;
    searchWrapper.classList.toggle('search-expanded');
  }

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
          // idleMapSearch={boundaries => this.getBoundaryPlaces(boundaries)}
          idleMapSearch={() => this.getLocalityPlaces()}
        />
        <div ref={this.searchWrapper} className="search-wrapper">
          <svg
            onClick={() => this.toggleSearch()}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="search-icon feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <SearchName
            handlePlaceSelection={place => this.handlePlaceSelection(place)}
            onSearchUpdate={searchQuery => this.handleSearch(searchQuery)}
            searchQuery={this.state.searchQuery}
            places={this.state.filteredPlaces}
          />
        </div>

        <div ref={this.placeInfoWrapper} className="place-info-mini">
          {selected && (
            <>
              <div className="place-info__row">
                <div className="place-info__overview">
                  <h1 className="heading heading--1">{selected.name}</h1>
                  <p className="category">{`#${selected.category
                    .split(' ')
                    .join('_')}`}</p>
                  {selected.schedule.time.openTime &&
                    selected.schedule.time.closeTime && (
                      <p className="schedule">
                        {`Schedule: ${openTime}h - ${closeTime}h from ${selected.schedule.from} to ${selected.schedule.to}`}
                      </p>
                    )}
                </div>
                <span className="suggestions-num-wrapper">
                  {selected.supports.length}
                </span>
              </div>
              <div className="place-info__row">
                <div className="place-info-mini__image-wrapper">
                  <img src={selected.images[0]} className="place-info__image" />
                </div>
                <p className="place-info__description">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sapiente, ipsum eveniet amet deleniti quisquam deserunt totam
                  quasi sit labore placeat voluptas adipisci error voluptate
                  tempora nostrum facere repellat provident voluptates!
                  {/* {selected.description} */}
                </p>
              </div>
              <div className="place-info-mini__learn-more">
                <p>know more about this place</p>{' '}
                <span className="bounce-animation">&darr;</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default HomeView;
