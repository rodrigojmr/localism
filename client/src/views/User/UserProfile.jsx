import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from './../../services/user';

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
              <img
                src={publicUser.avatar}
                alt={publicUser.name}
                className="user-profile__avatar u-border-radius-50"
              />
              <h1 className="heading heading--1 u-margin-bottom-xsmall">
                {publicUser.name}
              </h1>
              <p>{publicUser.info?.about}</p>

              <h1 className="heading heading--1">From {publicUser.locality}</h1>
              <div className="user-profile__info">
                <div className="user-profile__info-item">
                  Supports:
                  <br />
                  {publicUser.supports.length} Places
                </div>
              </div>

              <div>
                {publicUser.owner && (
                  <h4>
                    Owns:
                    <Link to={`/place/${place._id}`}>
                      {' '}
                      {place.avatar} {place.name}
                    </Link>
                  </h4>
                )}
              </div>
              <div className="user-supports">
                {publicUser.supports.length && (
                  <>
                    <h2> You Support:</h2>
                    <div className="user-supports-wrapper">
                      {publicUser.supports.map(support => (
                        <div className="support-small" key={support._id}>
                          <Link to={`/profile/${support.place._id}`}>
                            <img
                              src={support.place.images[0]}
                              alt={support.place.name}
                            />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                )}
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
