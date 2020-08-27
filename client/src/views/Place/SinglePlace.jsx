import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadPlace } from './../../services/place';
import SinglePlaceMap from './../../components/Map/SinglePlaceMap';
import getHours from 'date-fns/getHours';
const { utcToZonedTime } = require('date-fns-tz');
// import parse from 'date-fns/parse';

class SinglePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      place: undefined,
      support: undefined
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    loadPlace(id).then(data => {
      const { place } = data;
      console.log('place: ', place);
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
    let openTime, closeTime;
    if (place) {
      if (place.schedule.time.openTime) {
        openTime = getHours(
          utcToZonedTime(place.schedule.time.openTime, 'Europe/Lisbon')
        );
      }
      if (place.schedule.time.closeTime) {
        closeTime = getHours(
          utcToZonedTime(place.schedule.time.closeTime, 'Europe/Lisbon')
        );
      }
    }

    return (
      <div className="place-page">
        {this.state.loaded && (
          <>
            <div className="place-info__row">
              <div className="place-info__overview">
                <h1 className="heading heading--1">{place.name}</h1>
                <p className="category">{`${place.category
                  .split(' ')
                  .join('_')}`}</p>
                {place.schedule.time.openTime &&
                  place.schedule.time.closeTime && (
                    <p className="schedule">
                      {`Schedule: ${openTime}h - ${closeTime}h from ${place.schedule.from} to ${place.schedule.to}`}
                    </p>
                  )}
              </div>
              <div>
                <div className="suggestions-num-wrapper">
                  {place.supports.length}
                </div>
              </div>
            </div>
            <div className="place-info__row place-info__images-wrapper">
              {place.images.map(image => (
                <div key={image} className="place-info__image-wrapper">
                  <img
                    alt={place.name}
                    src={image}
                    className="place-info__image"
                  />
                </div>
              ))}
            </div>
            <div className="place-info__row place-info__owner">
              <h2>Meet the owners</h2>
              <div className="place-owner">
                <div className="place-owner__img-wrapper">
                  <Link to={`/profile/${place.owner._id}`}>
                    <img src={place.owner.avatar} alt={place.owner.name} />
                  </Link>
                </div>
                <div className="place-owner__description">
                  <p>{place.owner.name}</p>
                  <p>{place.about}</p>
                </div>
              </div>
            </div>
            <div className="place-info__row place-info__supports">
              {(place.supports.length && (
                <>
                  <h2>Supported by:</h2>
                  <div className="place-supports-wrapper">
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
                  </div>
                </>
              )) || <h2>Not supported by anyone yet!</h2>}
            </div>
            <div className="place-info__row">
              {place.supports.some(support => support.content !== '')
                .length && (
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
              )}
            </div>
            <div className="place-info__row"></div>
            <SinglePlaceMap place={this.state.place} />
            {this.props.user && place.owner._id !== this.props.user._id && (
              <>
                <Link
                  className="support-link"
                  to={`/place/${this.props.match.params.id}/support`}
                >
                  Support this place
                </Link>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default SinglePlace;
