import React from 'react';

const PlaceSupportSection = ({ supported, place, showModal, setShowModal }) => {
  const text = supported ? 'Edit your support' : 'Support this place';

  return (
    <section className="support-action">
      {!supported && (
        <h3 className="heading heading--3 u-margin-bottom-small">
          Do you want to support it?
          <br />
          Show some love.
        </h3>
      )}
      <button
        onClick={e => {
          e.preventDefault();
          setShowModal(!showModal);
        }}
        className="btn btn--primary"
      >
        {text}
      </button>
    </section>
  );
};

export default PlaceSupportSection;
