import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadProfile } from './../../services/profile';
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
    loadProfile(id).then(data => {
      const { user } = data;
      this.setState({
        loaded: true,
        user
      });
    });
  }

  render() {
    return (
      <div className="user">
        {this.state.loaded && (
          <>
            <div className="user-info__row">
              <div>
                <h1> Hello, {user.name}</h1>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default UserProfile;
