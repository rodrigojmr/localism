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

  return (
    <form onSubmit={handleFormSubmission}>
      <label htmlFor="content-input">What do you love about this place?</label>
      <textarea
        id="content-input"
        placeholder="Write your comment here..."
        name="content"
        value={props.content}
        onChange={handleContentInputChange}
      />
      <button type="submit">
        {props.isEdit ? 'Edit Support' : 'Create Support'}
      </button>
    </form>
  );
};

export default SupportForm;
