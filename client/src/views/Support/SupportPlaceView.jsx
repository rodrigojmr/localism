import React, { Component } from 'react';
import SupportForm from '../../components/Form/SupportForm';

//import { loadplace } from '../../services/place';
import { createSupport } from '../../services/support';

class SupportPlaceView extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      loaded: false
    };
  }

  handlePlaceCreation = async () => {
    const content = this.state.content;
    const placeId = this.props.match.params.id;

    createSupport(content, placeId)
      .then(data => {
        const support = data.support;
        const id = support._id;
        this.props.history.push(`/place/${id}/support`);
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

  componentDidMount() {}

  render() {
    return (
      <div>
        <SupportForm
          content={this.state.content}
          onContentChange={this.handleContentChange}
          onSupportChange={this.handleSupportChange}
          onFormSubmission={this.handlePlaceCreation}
        />
      </div>
    );
  }
}

export default SupportPlaceView;
