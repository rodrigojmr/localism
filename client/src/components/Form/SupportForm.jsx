import React, { useState, useEffect, useContext } from 'react';
import {
  createSupport,
  editSupport,
  deleteSupport
} from '../../services/support';
import UserContext from '../../components/Context/UserContext';

const SupportForm = ({ supported, place, ...props }) => {
  const [content, setContent] = useState('');
  const { currentUser } = useContext(UserContext);
  const id = place?._id;

  useEffect(() => {
    if (supported) {
      const existingComment = place.supports.find(
        support => support.creator._id === currentUser._id
      ).content;
      setContent(existingComment);
    }
  }, []);

  const handleFormSubmit = (e, method) => {
    e.preventDefault();
    const body = { content };

    apiCall(method, body)
      .then(() => {
        if (props.setModal) {
          props.setModal(false);
        }
        props.refresh();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const apiCall = (method, body) => {
    switch (method) {
      case 'create':
        return createSupport(id, body);
        break;
      case 'edit':
        return editSupport(id, body);
        break;
      case 'delete':
        return deleteSupport(id);
        break;
    }
  };

  return (
    <>
      <form className="support-form">
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
        {supported ? (
          <>
            <button
              className="btn btn--primary"
              onClick={e => handleFormSubmit(e, 'edit')}
              type="submit"
            >
              Edit
            </button>
            <button
              className="btn"
              onClick={e => handleFormSubmit(e, 'delete')}
              type="submit"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            className="btn btn--primary"
            onClick={e => handleFormSubmit(e, 'create')}
            type="submit"
          >
            Support
          </button>
        )}
      </form>
    </>
  );
};

export default SupportForm;
