import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadPlace } from './../../services/place';
import SinglePlaceMap from './../../components/Map/SinglePlaceMap';
import getHours from 'date-fns/getHours';
import EmblaCarousel from './../../components/EmblaCarousel';

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
    this.loadPlace();
  }

  loadPlace = () => {
    const { id } = this.props.match.params;
    loadPlace(id).then(data => {
      const { place } = data;
      this.setState({
        loaded: true,
        place
      });
    });
  };

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
            <div className="u-margin-bottom-xsmall">
              <EmblaCarousel name={place.name} slides={place.images} />
            </div>
            <div className="place__row">
              <div className="place__overview">
                <h1 className="heading heading--1">{place.name}</h1>
                <p className="category">{`#${place.category
                  .split(' ')
                  .join('_')}`}</p>
                {place.schedule.time.openTime && place.schedule.time.closeTime && (
                  <p className="schedule">
                    {`Schedule: ${openTime}h - ${closeTime}h` + ' from '}
                    <span className="capitalize">{`${place.schedule.from}`}</span>
                    {' to '}
                    <span className="capitalize">{`${place.schedule.to}`}</span>
                  </p>
                )}
              </div>
              <div>
                <div className="suggestions-num-wrapper">
                  {place.supports.length}
                </div>
              </div>
            </div>
            <div className="place__row">
              <p className="place__description">{place.description}</p>
            </div>
            <div className="place__row place__row--v">
              <h2 class="heading heading--2 u-align-l u-margin-bottom-xsmall">
                Meet the owners
              </h2>
              <div className="place__owner">
                <div className="place__owner-img-wrapper">
                  <Link to={`/profile/${place.owner._id}`}>
                    <img src={place.owner.avatar} alt={place.owner.name} />
                  </Link>
                  <p>{place.owner.name}</p>
                </div>
                <div className="place__owner-about">
                  <p>{place.about}</p>
                </div>
              </div>
            </div>
            <SinglePlaceMap place={this.state.place} />
            <div className="place__row place__supports">
              {(place.supports.length && (
                <>
                  <h2 className="heading heading--2">Supported by:</h2>
                  <div className="place__supports-wrapper">
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
              )) || (
                <h2 className="heading heading--2">
                  >Not supported by anyone yet!
                </h2>
              )}
            </div>
            <div className="place__row">
              {place.supports.some(support => support.content !== '')
                .length && (
                <>
                  <h2 className="heading heading--2">
                    >What people had to say:
                  </h2>
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
            {this.props.user && place.owner._id !== this.props.user._id && (
              <>
                <h3 className="heading heading--3 u-align-l u-margin-bottom-small">
                  Do you want to support it?
                  <br />
                  Show some love.
                </h3>
                <Link
                  className="btn btn--primary"
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
