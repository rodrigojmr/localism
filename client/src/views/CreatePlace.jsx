import React, { Component } from 'react';
import Map from '../components/Map';
import PlaceForm from '../components/Form/PlaceForm';

class CreatePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  handleContentChange() {}

  componentDidMount() {}

  render() {
    return (
      <div className="home">
        <Map />
        <PlaceForm />
      </div>
    );
  }
}

export default CreatePlace;
