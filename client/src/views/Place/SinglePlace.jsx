import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadPlace } from './../../services/place';
import SinglePlaceMap from './../../components/Map/SinglePlaceMap';

class SinglePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      place: undefined
    };
  }

  handleContentChange() {}

  componentDidMount() {
    const { id } = this.props.match.params;
    loadPlace(id).then(data => {
      const { place } = data;
      this.setState({
        loaded: true,
        place
      });
    });
  }

  render() {
    if (this.props.place) {
      console.log(this.props.place);
    }
    const { place } = this.state;
    return (
      <div className="home">
        {this.state.loaded && (
          <>
            <h1>{place.name}</h1>
            <h3>{place.category}</h3>
            <h2>Meet the owners</h2>
            <p>{place.owner.username}</p>
            <SinglePlaceMap place={this.state.place} />
            <Link to={`/place/${this.props.match.params.id}/support`}>
              Support this place
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default SinglePlace;
