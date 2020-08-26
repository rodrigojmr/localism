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
      user: undefined
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
        user
      });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="user">
        {this.state.loaded && (
          <>
            <div className="user-info__row">
              <div>
                <h1> Hello, {user.username}</h1>
                <p>Profile view</p>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default UserProfile;
