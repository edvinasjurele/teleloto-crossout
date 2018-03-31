import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import cx from 'classnames';

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

const ReactModal = ({ className, children, onRequestClose, ...props }) => (
  <Modal
    style={customStyles}
    contentLabel="Example Modal"
    ariaHideApp={false}
    shouldCloseOnOverlayClick={false}
    onRequestClose={onRequestClose}
    className={cx('Modal', className)}
    overlayClassName="Overlay"
    {...props}
  >
    <div
      className="Modal__close"
      onClick={() => onRequestClose()}
      role="presentation"
    >
      ✕
    </div>
    {children}
  </Modal>
);

ReactModal.propTypes = {
  className: PropTypes.string,
  onRequestClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

ReactModal.defaultProps = {
  className: undefined,
  onRequestClose: undefined,
};

export default ReactModal;
