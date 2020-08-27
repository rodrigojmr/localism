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
      console.log({ user, place });
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
    console.log(publicUser);
    return (
      <div className="form">
        {this.state.loaded && (
          <>
            <div className="user-profile-picture">
              <div className="image-cropper">
                <Link to={`/profile/${publicUser._id}`}>
                  <img
                    src={publicUser.avatar}
                    alt={publicUser.name}
                    className="profile-pic"
                  />
                </Link>
              </div>
              <div className="input-username">
                <div className="fullname">
                  <p>Username</p>
                  <h4>
                    <strong> {publicUser.username}</strong>
                  </h4>
                </div>
              </div>
            </div>

            <div className="fullname">
              <p>FullName</p>
              <h4>
                <strong> {publicUser.name}</strong>
              </h4>
            </div>
            <div className="fullname">
              <p>Email</p>
              <h4>
                <strong> {publicUser.email}</strong>
              </h4>
            </div>
            <div className="fullname">
              <p> Gender</p>
              {(publicUser.gender && publicUser.gender.length > 0 && (
                <h4>
                  <strong> {publicUser.gender}</strong>
                </h4>
              )) || <h4>No Gender Specified.</h4>}
            </div>
            <div className="fullname">
              <p>Birthday</p>
              {(publicUser.birthday && (
                <h4>
                  <strong> {publicUser.info.birthday}</strong>
                </h4>
              )) || <h4>No Birthdate Specified.</h4>}
            </div>

            <div className="fullname">
              <p>You are based at:</p>
              <h4>
                <strong> {this.state.publicUser.locality}</strong>
              </h4>
            </div>
            <div>
              {publicUser.owner && (
                <h4>
                  Owns:
                  <Link to={`/profile/${place._id}`}>
                    {' '}
                    {place.avatar} {place.name}
                  </Link>
                </h4>
              )}
            </div>
            <div>
              {place.supports.length && (
                <>
                  <h2> You Support:</h2>
                  {place.supports.map(support => (
                    <div className="support-small" key={support._id}>
                      <Link to={`/profile/${support.place._id}`}>
                        <img src={support.place.avatar} alt={support.place.name} />
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>

            <Link to={'/profile/edit'}>
              <button className="sign-button"> Edit Profile</button>
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default UserProfile;
