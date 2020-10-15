import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from './../../services/user';
import ProfileHeader from './../../components/Profile/ProfileHeader';
import PlaceInfoWithCarousel from './../../components/Place/PlaceInfoWithCarousel';
import SupportsProfileList from './../../components/Support/SupportsProfileList';
import { UserContext } from '../../components/Context/UserContext';

//import SinglePlaceMap from './../../components/Map/SinglePlaceMap';
const UserProfile = props => {
  const [loaded, setLoaded] = useState(false);
  const [publicUser, setPublicUser] = useState(null);
  const [place, setPlace] = useState(null);
  const user = useContext(UserContext);

  const getUser = () => {
    const id = props.match.params.id;
    loadProfile(id).then(data => {
      setPublicUser(data.user);
      setPlace(data.place);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile-page">
      {loaded && (
        <>
          <main className="profile">
            <ProfileHeader user={publicUser} />
            {publicUser.owner && (
              <section className="owner-place">
                <h1 className="heading">
                  {publicUser.name} owns this place. <br />
                  Consider supporting it!
                </h1>
                <PlaceInfoWithCarousel place={place} />
              </section>
            )}
            <section className="user-support-section">
              {(publicUser.supports.length > 0 && (
                <>
                  <h1 className="heading heading--1">
                    Places supported by {publicUser.name}:
                  </h1>
                  <SupportsProfileList supports={publicUser.supports} />
                </>
              )) || (
                <h1 className="heading heading--1">
                  {publicUser.name} doesn't support any places yet.
                </h1>
              )}
            </section>
          </main>
          {user && publicUser._id === user._id && (
            <Link
              className="btn btn--primary u-margin-top-xsmall u-margin-bottom-xsmall"
              to={'/profile/edit'}
            >
              {' '}
              Edit Profile
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;
