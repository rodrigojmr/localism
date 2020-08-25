import React, { Component } from 'react';
import PlaceForm from '../components/Form/PlaceForm';
import { createPlace } from '../services/place';

class CreatePlace extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      name: '',
      category: '',
      openDate: '',
      formatted_address: '',
      address_components: [],
      weekDayOpen: '',
      weekDayClose: '',
      openTime: '',
      closeTime: '',
      phoneNumber: '',
      email: '',
      place_id: '',
      location: undefined
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

  handleValueChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handlePlaceCreation = () => {
    const body = { ...this.state };
    console.log('body: ', body);
    createPlace(body)
      .then(data => {
        console.log('data after createPlace: ', data);
        const id = data.place._id;
        // Redirect user to single post view
        this.props.history.push(`/place/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="home">
        <PlaceForm
          {...this.state}
          onDateChange={this.handleDateChange}
          onValueChange={this.handleValueChange}
          onFormSubmission={this.handlePlaceCreation}
        />
      </div>
    );
  }
}

export default CreatePlace;
