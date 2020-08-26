import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadPlace } from './../../services/place';
import SinglePlaceMap from './../../components/Map/SinglePlaceMap';
import getHours from 'date-fns/getHours';
// import parse from 'date-fns/parse';
const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz');

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
    const { place } = this.state;
    let openTime, closeTime;
    if (place) {
      console.log('place: ', place);
      openTime = getHours(
        utcToZonedTime(place.schedule.time.openTime, 'Europe/Lisbon')
      );
      closeTime = getHours(
        utcToZonedTime(place.schedule.time.closeTime, 'Europe/Lisbon')
      );
    }
    return (
      <div className="home">
        {this.state.loaded && (
          <>
            <div className="place-info__row">
              <div>
                <h1>{place.name}</h1>
                <h3>{`#${place.category.split(' ').join('_')}`}</h3>
                <p>{`Schedule: ${openTime}h - ${closeTime}h from ${place.schedule.from} to ${place.schedule.to}`}</p>
              </div>
              <div>
                <div className="suggestions-num-wrapper">
                  {place.supports.length}
                </div>
              </div>
            </div>
            <div className="place-info__row">
              <h2>Meet the owners</h2>
              <div className="place-owner">
                <img src={place.owner.avatar} />
                <p>{place.owner.name}</p>
              </div>
            </div>
            <p>{place.about}</p>
            <div className="place-info__row">
              {(place.supports.length && (
                <>
                  <h2>Supported by:</h2>
                  {place.supports.map(support => (
                    <div className="support" key={support._id}>
                      <Link to={`/profile/${support.creator._id}`}>
                        <img
                          src={support.creator.avatar}
                          alt={support.creator.username}
                        />
                      </Link>
                    </div>
                  ))}
                </>
              )) || <h2>Not supported by anyone yet!</h2>}
            </div>
            <div className="place-info__row"></div>
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
