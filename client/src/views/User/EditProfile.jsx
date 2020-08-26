import React, { Component } from 'react';
import { loadUser } from '../../services/authentication';
import { editProfile } from './../../services/user';
import MapSearch from './../../components/Map/MapSearch';
import UserProfileForm from '../../components/Form/EditProfileForm';

class EditProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      name: '',
      username: '',
      email: '',
      password: '',
      avatarPreview: '/images/default-avatar.png',
      avatar: '',
      location: undefined,
      locality: '',
      password: '',
      birthday: ''
    };
  }

  componentDidMount() {
    this.getLocation();
    this.getUser();
  }

  getUser() {
    loadUser().then(data => {
      console.log('data: ', data);
      this.setState({
        avatarPreview: data.user.avatar,
        ...data.user
      });
    });
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      function error(msg) {
        alert('Please enable your GPS position feature.');
      },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    );
  }

  handleValueChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  emailValidation = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  handleFormSubmission = () => {
    const id = this.props.user._id;
    const body = { ...this.state };
    editProfile(id, body)
      .then(data => {
        const { user } = data;
        this.props.onUserUpdate(user);
        this.props.history.push(`/profile/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleAvatarInputChange = avatar => {
    this.setState({
      avatarPreview: URL.createObjectURL(avatar),
      avatar
    });
  };

  render() {
    return (
      <div>
        <UserProfileForm
          {...this.state}
          onDateChange={this.handleDateChange}
          onValueChange={this.handleValueChange}
          onAvatarChange={this.handleAvatarInputChange}
          onFormSubmission={this.handleFormSubmission}
          isEdit={true}
        />
      </div>
    );
  }
}

export default EditProfileView;
