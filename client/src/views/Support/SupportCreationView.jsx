import React, { Component } from 'react';
import SupportForm from './../../components/SupportForm';

import { loadplace } from './../../services/place';
import { createSupport } from './../../services/support';

class SupportCreationView extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      loaded: false,
      place: undefined
    };
  }

  handleSupportCreation = async () => {
    const content = this.state.content;
    const placeId = this.props.match.params.id;

    const body = { content, place: placeId };

    createSupport(body)
      .then(data => {
        const support = data.support;
        const id = support._id;
        this.props.history.push(`/place/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSupportChange = support => {
    this.setState({
      loaded: true
    });
  };
  handleContentChange = content => {
    this.setState({
      content
    });
  };

  render() {
    return (
      <div>
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
