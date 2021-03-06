import React, { Component } from 'react';
import SupportForm from './../../components/Form/SupportForm';

import { loadPlace } from './../../services/place';
import { createSupport } from './../../services/support';

class SupportCreationView extends Component {
  constructor() {
    super();
    this.state = {
      places: [],
      content: '',
      loaded: false
    };
  }

  handleSupportCreation = () => {
    const body = { content: this.state.content };
    const placeId = this.props.match.params.id;

    createSupport(placeId, body)
      .then(data => {
        const support = data.support;
        const id = support._id;
        this.props.history.push(`/place/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleContentChange = content => {
    this.setState({
      content
    });
  };

  render() {
    return (
      <div className="create-support">
        <SupportForm
          content={this.state.content}
          onContentChange={this.handleContentChange}
          onSupportChange={this.handleSupportChange}
          onFormSubmission={this.handleSupportCreation}
        />
      </div>
    );
  }
}

export default SupportCreationView;
