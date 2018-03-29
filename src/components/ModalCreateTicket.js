import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

import Ticket from './Ticket';

class ModalCreateTicket extends React.Component {
  state = {
    ticket: {
      values: [
        [7, 27, 39, 51, 66],
        [11, 20, 33, 49, 68],
        [8, 18, 45, 57, 75],
        [13, 21, 36, 53, 65],
        [10, 30, 37, 52, 72],
      ],
      number: '0657387',
    },
  };

  render() {
    const { addTicket } = this.props;
    return (
      <Modal {...this.props}>
        <div className="text-center">
          {/* TODO: make editable ticket inputs */}
          <Ticket {...this.state.ticket} />
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
}

ModalCreateTicket.propTypes = {
  addTicket: PropTypes.func.isRequired,
};

export default ModalCreateTicket;
