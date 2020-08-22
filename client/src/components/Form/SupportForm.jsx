import React from 'react';

const SupportForm = props => {
  const handleFormSubmission = event => {
    event.preventDefault();
    props.onFormSubmission();
  };

  const handleContentInputChange = event => {
    const content = event.target.value;
    props.onContentChange(content);
  };

  const handleSupportInputChange = event => {
    const counter = event.target.value[0];
    props.onSupportChange(counter);
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <label htmlFor='input-support'>Do you suport this place?</label>
      <button onClick={handleSupportInputChange}>Support</button>
      <label htmlFor='content-input'>Support Content</label>
      <textarea
        id='content-input'
        placeholder='Write your comment here...'
        name='content'
        value={props.content}
        onChange={handleContentInputChange}
      />
      <button>{props.isEdit ? 'Edit Support' : 'Create Support'}</button>
    </form>
  );
};

export default SupportForm;
