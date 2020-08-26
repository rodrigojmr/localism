import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from './../../services/user';
//import SinglePlaceMap from './../../components/Map/SinglePlaceMap';
import getHours from 'date-fns/getHours';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      publicUser: undefined
    };
  }

  handleContentChange() {}

  componentDidMount() {
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

  render() {
    const { publicUser } = this.state;
    console.log({ user });

    const locality = publicUser.privateAddress.find(
      component =>
        component.types.includes('locality') ||
        component.types.includes('administrative_area_level_1')
    ).short_name;

    return (
      <div className="user">
        {this.state.loaded && (
          <>
            <div className="user-info__row">
              <div>
                <h4> {user.username}'s profile</h4>
              </div>
            </div>
            <div className="user-info__row">
              <div className="user-name">
                <Link to={`/profile/${user._id}`}>
                  <img src={user.avatar} alt={user.name} />
                </Link>

                <div>
                  <p>Name and Last Name</p>
                  <h4>
                    <strong> {user.name}</strong>
                  </h4>
                </div>
                <div>
                  <p>Email</p>
                  <h4>
                    <strong> {user.email}</strong>
                  </h4>
                </div>
                <div>
                  <p>Gender</p>
                  <h4>{/*<strong> {user.gender}</strong>*/}</h4>
                </div>
                <div>
                  <p>Birthday</p>
                  <h4>{/*<strong> {user.info.birthday}</strong>*/}</h4>
                </div>
                <div>
                  <p>Pasword</p>
                  <h4>
                    <strong> {user.passwordHashAndSalt}</strong>
                  </h4>
                </div>
                <div className="Address">
                  {user.privateAddress.length && (
                    <>
                      <p>Address</p>

                      <h4>
                        <strong> {locality}</strong>
                      </h4>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default UserProfile;
