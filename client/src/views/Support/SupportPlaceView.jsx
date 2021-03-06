import React, { Component } from 'react';
import SupportForm from './../../components/Form/SupportForm';

// Use to show more information about place in support view
// import { loadPlace } from './../../services/place';
import { createSupport } from './../../services/support';

class SupportPlaceView extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      loaded: false
    };
  }

  handleSupportCreation = () => {
    const body = { content: this.state.content };
    const placeId = this.props.match.params.id;

    createSupport(placeId, body)
      .then(data => {
        this.props.history.push(`/place/${placeId}`);
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

export default SupportPlaceView;
