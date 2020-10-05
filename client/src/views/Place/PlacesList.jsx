import React, { Component } from 'react';

import { loadAllPlaces } from './../../services/place';

import PlaceInfoWithCarousel from './../../components/Place/PlaceInfoWithCarousel';

export class PlacesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      places: undefined
    };
  }

  componentDidMount() {
    loadAllPlaces().then(data => {
      const { places } = data;
      this.setState({
        loaded: true,
        places
      });
    });
    /*loadSupport(id).then(data => {
      const { support } = data;
      this.setState({
        loaded: true,
        support
      });
    });*/
  }

  render() {
    return (
      <div className="places">
        {this.state.loaded && (
          <div className="places-list">
            {this.state.places.map(place => (
              <PlaceInfoWithCarousel key={place._id} place={place} support />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default PlacesList;
