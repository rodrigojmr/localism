import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from './../../services/user';
import ProfileHeader from './../../components/Profile/ProfileHeader';
import PlacePreviewWithCarousel from './../../components/Place/PlacePreviewWithCarousel';
import SupportsProfileList from './../../components/Support/SupportsProfileList';

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
            <main className="profile">
              <ProfileHeader user={publicUser} />
              {publicUser.owner && (
                <section className="owner-place">
                  <h1 className="heading">
                    {publicUser.name} owns this place. <br />
                    Consider supporting it!
                  </h1>
                  <PlacePreviewWithCarousel place={place} />
                </section>
              )}
              <section className="user-support-section">
                <h1 className="heading heading--1">
                  Places supported by {publicUser.name}:
                </h1>
                {publicUser.supports.length && (
                  <SupportsProfileList supports={publicUser.supports} />
                )}
              </section>
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
