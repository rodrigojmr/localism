import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadPlace } from './../../services/place';
import SinglePlaceMap from './../../components/Map/SinglePlaceMap';
import getHours from 'date-fns/getHours';
import PlaceInfoWithCarousel from './../../components/Place/PlaceInfoWithCarousel';
import Owner from './../../components/Profile/Owner';
import SupportGrid from './../../components/Support/SupportGrid';
import SupportFromUser from './../../components/Support/SupportFromUser';

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

    const supportsWithCommentsExist = () =>
      place.supports.some(support => support.content !== '');
    const supportsWithoutCommentsExist = () =>
      place.supports.some(support => support.content === '');

    const placesWithComments = () => {
      return place.supports
        .filter(support => support.content !== '')
        .map(support => (
          <SupportFromUser support={support} key={support._id} />
        ));
    };

    return (
      <div className="place-page">
        {this.state.loaded && (
          <>
            <PlaceInfoWithCarousel place={place} />
            <section className="owner-section flex-center-both flex-v">
              <h2 className="heading heading--2 u-margin-bottom-xsmall">
                Meet the owners
              </h2>
              <Owner place={place} />
            </section>
            <SinglePlaceMap place={place} />
            <section className="support-section">
              {place.supports.length && (
                <>
                  <h2 className="heading heading--2 u-margin-bottom-xsmall">
                    Supported by locals!
                  </h2>
                  {supportsWithCommentsExist() && (
                    <div className="flex-center-both flex-v">
                      {placesWithComments()}
                    </div>
                  )}
                  {supportsWithoutCommentsExist() && (
                    <section className="flex-center-both flex-v supports">
                      <SupportGrid place={place} />
                    </section>
                  )}
                </>
              )}
            </section>
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
