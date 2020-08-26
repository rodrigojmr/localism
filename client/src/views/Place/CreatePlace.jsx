import React, { Component } from 'react';
import PlaceForm from '../../components/Form/PlaceForm';
import { createPlace } from '../../services/place';

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
      website: '',
      instagram: '',
      place_id: '',
      location: undefined,
      images: [],
      imagesPreview: []
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
    createPlace(body)
      .then(data => {
        const id = data.place._id;
        // Redirect user to single post view
        this.props.history.push(`/place/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleImages = images => {
    const imagesPreview = [];
    for (let key in images) {
      if (key !== 'length' && key !== 'item') {
        imagesPreview.push(URL.createObjectURL(images[key]));
      }
    }

    this.setState({
      images,
      imagesPreview
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="create-place">
        <h1 className="heading heading--1">
          Hey {this.props.user && <>{this.props.user.username}</>}, do you own a
          place in this area?
        </h1>
        Yes / No
        {/* Make two separate sections for this */}
        <div className="create-place-form-wrapper">
          <h2 className="heading heading--2">
            Let locals know better, register your place!
          </h2>
          <PlaceForm
            {...this.state}
            onImagesChange={this.handleImages}
            onDateChange={this.handleDateChange}
            onValueChange={this.handleValueChange}
            onFormSubmission={this.handlePlaceCreation}
          />
        </div>
      </div>
    );
  }
}

export default CreatePlace;
