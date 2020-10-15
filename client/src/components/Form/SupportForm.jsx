import React, { useState, useEffect, useContext } from 'react';
import {
  createSupport,
  editSupport,
  deleteSupport
} from '../../services/support';
import { UserContext } from '../../components/Context/UserContext';

const SupportForm = ({ supported, place, ...props }) => {
  const [content, setContent] = useState('');
  const user = useContext(UserContext);
  const id = place?._id;

  useEffect(() => {
    if (supported) {
      const existingComment = place.supports.find(
        support => support.creator._id === user._id
      ).content;
      setContent(existingComment);
    }
  }, []);

  const handleFormSubmission = e => {
    console.log('form submit');
    e.preventDefault();
    const body = { content };
    if (supported) {
      console.log('id, body: ', id, body);
      editSupport(id, body).catch(error => {
        console.log(error);
      });
    } else {
      createSupport(id, body).catch(error => {
        console.log(error);
      });
    }
    if (props.setModal) {
      props.setModal(false);
    }
  };

  const handleSupportDelete = e => {
    e.preventDefault();
    console.log('attempting delete');
    deleteSupport(id).catch(error => console.log(error));
  };

  return (
    <>
      <form className="support-form" onSubmit={handleFormSubmission}>
        <label htmlFor="content-input">
          What do you love about this place?
        </label>
        <textarea
          id="content-input"
          placeholder="Write your comment here... (Optional)"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button className="btn btn--primary" type="submit">
          {supported ? 'Edit' : 'Create Support'}
        </button>
        {supported && (
          <button className="btn" onClick={e => handleSupportDelete(e)}>
            Delete
          </button>
        )}
      </form>
    </>
  );
};

export default SupportForm;
