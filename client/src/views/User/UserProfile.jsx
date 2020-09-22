import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from './../../services/user';
import PlaceMiniTwo from './../../components/Place/PlaceMiniTwo';

//import SinglePlaceMap from './../../components/Map/SinglePlaceMap';
class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      publicUser: undefined
    };
  }

  getUser() {
    const id = this.props.match.params.id;
    loadProfile(id).then(data => {
      const { user, place } = data;
      this.setState({
        loaded: true,
        place: { ...place },
        publicUser: { ...user }
      });
    });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { publicUser } = this.state;
    const { place } = this.state;
    return (
      <div className="profile-page">
        {this.state.loaded && (
          <>
            <main className="user-profile">
              <div className="user-profile__info">
                <img
                  src={publicUser.avatar}
                  alt={publicUser.name}
                  className="user-profile__avatar u-border-radius-50"
                />
                <h1 className="heading heading--1 u-margin-bottom-xsmall">
                  {publicUser.name}
                </h1>
                <p>{publicUser.info?.about}</p>
                <p>From {publicUser.locality}</p>
                {publicUser.owner && (
                  <h4>
                    {publicUser.name} owns:
                    <Link to={`/place/${place._id}`}>
                      {' '}
                      {place.avatar} {place.name}
                    </Link>
                  </h4>
                )}
              </div>

              <div className="user-supports">
                {`${publicUser.name} supports ${publicUser.supports.length} ${
                  publicUser.supports.length > 1 ? 'places' : 'place'
                }`}
                {publicUser.supports.length && (
                  <>
                    <div className="user-supports__wrapper">
                      {publicUser.supports.map(({ place }) => (
                        <PlaceMiniTwo place={place} />
                        // <div className="user-supports__item" key={support._id}>
                        //   <Link to={`/place/${support.place._id}`}>
                        //     <img
                        //       className="user-supports__item-img"
                        //       src={support.place.images[0]}
                        //       alt={support.place.name}
                        //     />
                        //     <h3 className="heading heading--3 support__name">
                        //       {support.place.name}
                        //     </h3>
                        //   </Link>
                        // </div>
                      ))}
                    </div>
                  </>
                )}
                <div className="user-profile__info">
                  <div className="user-profile__info-item"></div>
                </div>
              </div>

              <Link to={'/profile/edit'}>
                <button className="sign-button"> Edit Profile</button>
              </Link>
            </main>
          </>
        )}
      </div>
    );
  }
}

export default UserProfile;
