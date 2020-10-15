import React from 'react';

const SupportModal = () => {
  return (
    <Modal modalRef={ref} show={showModal} toggle={setShowModal}>
      <SupportForm place={place} supported={supported} />
    </Modal>
  );
};

export default SupportModal;
