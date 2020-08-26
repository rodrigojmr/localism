import React, { Component } from 'react';
import { loadUser } from '../../services/user';
import { signUp } from '../../services/authentication';
import EditUserProfileForm from '../../components/Form/EditProfileForm';

class EditProfileView extends Component {
  constructor() {
    super();
    this.state = {
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
    this.getUser();
  }

  getUser() {
    loadUser().then(data => {
      this.setState({ ...data.user });
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
    const body = { ...this.state };
    signUp(body)
      .then(data => {
        const { user } = data;
        this.props.onUserUpdate(user);
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
        <EditUserProfileForm
          {...this.state}
          onDateChange={this.handleDateChange}
          onValueChange={this.handleValueChange}
          onAvatarChange={this.handleAvatarInputChange}
          onFormSubmission={this.handleFormSubmission}
        />
      </div>
    );
  }
}

export default EditProfileView;
