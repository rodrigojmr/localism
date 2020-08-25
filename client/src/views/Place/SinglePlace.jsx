import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadPlace } from './../../services/place';
import { loadSupport } from './../../services/support';
import SinglePlaceMap from './../../components/Map/SinglePlaceMap';

class SinglePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      place: undefined,
      support: undefined
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
    /*loadSupport(id).then(data => {
      const { support } = data;
      this.setState({
        loaded: true,
        support
      });
    });*/
  }

  render() {
    const { place } = this.state;
    console.log(this.state);
    return (
      <div className='home'>
        {this.state.loaded && (
          <>
            <h1>{place.name}</h1>
            <h3>{place.category}</h3>
            <h2>Meet the owners</h2>
            <p>{/*place.owner.username*/}</p>
            <SinglePlaceMap />
            <h2>Supported by</h2>
            <div>
              <p>{place.supports}</p>
            </div>
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
