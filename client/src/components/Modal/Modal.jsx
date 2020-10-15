import React, { useRef } from 'react';

const Modal = ({ modalRef, children, show }) => {
  return (
    <div
      ref={modalRef}
      className={`modal ${show ? 'modal--open' : 'modal--closed'}`}
      ref={modalRef}
    >
      <div className="modal-close"></div>
      {show && children}
    </div>
  );
};

export default Modal;
