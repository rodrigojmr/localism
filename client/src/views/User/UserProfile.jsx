import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile, editProfile } from './../../services/user';

//import SinglePlaceMap from './../../components/Map/SinglePlaceMap';
import getHours from 'date-fns/getHours';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      publicUser: undefined
    };
  }

  getUser() {
    const { id } = this.props.match.params;
    console.log('props match params id:', id);
    loadProfile(id).then(data => {
      const { user } = data;
      this.setState({
        loaded: true,
        publicUser: user
      });
    });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { publicUser } = this.state;
    return (
      <div className="public-user">
        {this.state.loaded && (
          <>
            <div className="user-info__row">
              <div>
                <h4> {publicUser.username}'s profile</h4>
              </div>
            </div>
            <div className="user-info__row">
              <div className="user-name">
                <Link to={`/profile/${publicUser._id}`}>
                  <img src={publicUser.avatar} alt={publicUser.name} />
                </Link>
                <div>
                  <p>Name and Last Name</p>
                  <h4>
                    <strong> {publicUser.name}</strong>
                  </h4>
                </div>
                <div>
                  <p>Email</p>
                  <h4>
                    <strong> {publicUser.email}</strong>
                  </h4>
                </div>
                <div>
                  <p>Gender</p>
                  {(publicUser.gender && publicUser.gender.length > 0 && (
                    <h4>
                      <strong> {publicUser.gender}</strong>
                    </h4>
                  )) || <h4>User did not state their gender.</h4>}
                </div>
                <div>
                  <p>Birthday</p>
                  {(publicUser.birthday && (
                    <h4>
                      <strong> {publicUser.info.birthday}</strong>
                    </h4>
                  )) || <h4>No Birthdate Specified.</h4>}
                </div>
                <div>
                  <p>Pasword</p>
                  <h4>
                    <strong> {publicUser.passwordHashAndSalt}</strong>
                  </h4>
                </div>
                <div className="Address">
                  <p>Address</p>
                  <h4>
                    <strong> {this.state.publicUser.locality}</strong>
                  </h4>
                </div>
              </div>
            </div>
            <Link to={'/profile/edit'}>
              <button> Edit Profile</button>
            </Link>
            <Link to={'/authentication/sign-out'}>
              <button> Sign Out</button>
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default UserProfile;
