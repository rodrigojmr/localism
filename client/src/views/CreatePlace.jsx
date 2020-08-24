import React, { Component } from 'react';

import PlaceForm from '../components/Form/PlaceForm';
import { createPlace } from '../services/place';

class CreatePlace extends Component {
  constructor(props) {
    super(props);
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
      lat: 0,
      lng: 0
    };
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

  componentDidMount() {}

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
