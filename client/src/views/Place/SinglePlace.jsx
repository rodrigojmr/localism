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
            <div className="place-info__row place-info__images-wrapper">
              {place.images.map(image => (
                <div className="place-info__image-wrapper">
                  <img src={image} className="place-info__image" />
                </div>
              ))}
            </div>
            <div className="place-info__row">
              <h2>Meet the owners</h2>
              <div className="place-owner">
                <Link to={`/profile/${place.owner._id}`}>
                  <img src={place.owner.avatar} alt={place.owner.name} />
                </Link>
                <p>{place.owner.name}</p>
              </div>
            </div>
            <p>{place.about}</p>
            <div className="place-info__row">
              {(place.supports.length && (
                <>
                  <h2>Supported by:</h2>
                  {place.supports.map(support => (
                    <div className="support-small" key={support._id}>
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
            <div className="place-info__row">
              {(place.supports.length && (
                <>
                  <h2>What people had to say:</h2>
                  {place.supports
                    .filter(support => support.content !== '')
                    .map(support => (
                      <div className="support" key={support._id}>
                        <div className="support__user-img">
                          <Link to={`/profile/${support.creator._id}`}>
                            <img
                              src={support.creator.avatar}
                              alt={support.creator.name}
                            />
                          </Link>
                        </div>
                        <div className="support__description">
                          <h3 className="heading heading--3">
                            {support.creator.name}
                          </h3>
                          <p>{support.content}</p>
                        </div>
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
