import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import './index.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ReactModal = ({ children, onRequestClose, ...props }) => (
  <Modal
    style={customStyles}
    contentLabel="Example Modal"
    ariaHideApp={false}
    shouldCloseOnOverlayClick={false}
    onRequestClose={onRequestClose}
    className="Modal"
    overlayClassName="Overlay"
    {...props}
  >
    <div className="Modal__close" onClick={() => onRequestClose()}>
      ✕
    </div>
    {children}
  </Modal>
);

ReactModal.propTypes = {
  onRequestClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default ReactModal;
