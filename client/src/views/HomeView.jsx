import React, { Component } from 'react';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      places: []
    };
  }

  componentDidMount() {}

  render() {
    return <div className="post-list"></div>;
  }
}

export default HomeView;
