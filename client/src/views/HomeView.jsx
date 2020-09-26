import React, { Component } from 'react';
import HomeMap from '../components/Map/HomeMap';
import SearchName from './../components/Search/SearchName';
import PlaceInfoWithCarousel from './../components/Place/PlaceInfoWithCarousel';
import { nearbyPlaces, localityPlaces } from './../services/place';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      location: null,
      locality: undefined,
      places: [],
      filteredPlaces: [],
      isSearching: false,
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

  getLocation = () => {
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
  };

  getBoundaryPlaces = boundaries => {
    nearbyPlaces(boundaries).then(data => {
      this.setState({
        places: data.places
      });
    });
    this.handleSearch(this.state.searchQuery);
  };

  getLocalityPlaces = () => {
    if (this.state.locality) {
      localityPlaces(this.state.locality).then(data => {
        this.setState({
          places: data.places
        });
      });
    }
  };

  handleLocalityUpdate = locality => {
    this.setState({
      locality
    });
  };

  handlePlaceSelection = place => {
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
  };

  handleSearch = searchQuery => {
    const filteredPlaces = this.state.places.filter(place =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    this.setState({
      searchQuery,
      filteredPlaces
    });
  };

  toggleSearch = search => {
    this.setState({
      isSearching: search
    });
  };

  removeSearch = () => {
    const searchWrapper = this.searchWrapper.current;
    searchWrapper.classList.remove('search-box--active');
  };

  render() {
    const selected = this.state.selectedPlace;

    return (
      <div className="home">
        <div className="home-info">
          <h1 className="heading heading--1">
            You are in {this.state.locality}
          </h1>
        </div>
        <HomeMap
          selected={this.state.selectedPlace}
          center={this.state.location}
          locality={this.state.locality}
          places={
            this.state.searchQuery
              ? this.state.filteredPlaces
              : this.state.places
          }
          handlePlaceSelection={place => this.handlePlaceSelection(place)}
          onLocalityUpdate={locality => this.handleLocalityUpdate(locality)}
          idleAddressMap={this.getLocalityPlaces}
        />
        {/* Unsure whether to have SearchName here in preparation for a search expansion feature or inside HomeMap for refactoring and DRY */}
        <SearchName
          ref={this.searchWrapper}
          toggleSearch={search => this.toggleSearch(search)}
          handlePlaceSelection={place => this.handlePlaceSelection(place)}
          onSearchUpdate={searchQuery => this.handleSearch(searchQuery)}
          searchQuery={this.state.searchQuery}
          places={this.state.filteredPlaces}
          locality={this.state.locality}
          isSearching={this.state.isSearching}
        />
        <div ref={this.placeInfoWrapper} className="place-info-mini">
          {selected && <PlaceInfoWithCarousel place={selected} />}
        </div>
      </div>
    );
  }
}

export default HomeView;
