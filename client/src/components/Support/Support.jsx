import React from 'react';

const Support = props => {
  return (
    <div className="support-item">
      (props.support.content && (
      <h3 className="heading heading--3">{props.support.content}</h3>
      ))
    </div>
  );
};

export default Support;
