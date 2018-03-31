import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

import Ticket from './Ticket';

function ModalCreateTicket({ addTicket, ...props }) {
  return (
    <Modal {...props}>
      <div className="text-center">
        <Ticket isEditable />
        <button
          type="button"
          className="btn btn-outline-secondary my-2"
          onClick={() => addTicket()}
        >
          + Prideti
        </button>
      </div>
    </Modal>
  );
}

ModalCreateTicket.propTypes = {
  addTicket: PropTypes.func.isRequired,
};

export default ModalCreateTicket;
