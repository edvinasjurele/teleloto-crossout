import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

function ConfirmationModal({
  title,
  message,
  onConfirmed,
  onRequestClose,
  ...props
}) {
  return (
    <Modal
      {...props}
      shouldCloseOnOverlayClick
      onRequestClose={onRequestClose}
      className="p-3"
    >
      <div style={{ maxWidth: '400px' }}>
        <div className="pr-2 mb-3">
          <h5>{title}</h5>
          <p>{message}</p>
        </div>
        <div className="text-right">
          <button
            className="btn btn-outline-secondary mr-2"
            onClick={onRequestClose}
          >
            Atšaukti
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              onConfirmed();
              onRequestClose();
            }}
          >
            Patvirtinti
          </button>
        </div>
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  onConfirmed: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

ConfirmationModal.defaultProps = {
  message: undefined,
};

export default ConfirmationModal;
