import React, { Component } from 'react';
import Map from '../components/Map';
import PlaceForm from '../components/Form/PlaceForm';
import { createPlace } from '../services/place';

class CreatePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      openDate: '',
      address: '',
      areaName: '',
      weekDayOpen: '',
      weekDayClose: '',
      openTime: '',
      closeTime: '',
      phoneNumber: '',
      email: '',
      latitude: 0,
      longitude: 0
    };
  }

  handleValueChange = (name, value) => {
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  handleDateChange = (name, date) => {
    console.log(name, date);
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

        <Map />
      </div>
    );
  }
}

export default CreatePlace;
