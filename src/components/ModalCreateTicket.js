import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

import { handleLottoInput, handleLottoTicketInput } from '../utils';
import Ticket from './Ticket';

class ModalCreateTicket extends React.Component {
  state = {
    editableTicketData: {
      values: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
      ],
      number: '',
    },
  };

  handleTicketInputChange = inputData => {
    const { id, value } = inputData;
    const [x, y] = id.split('_');
    const newValues = [...this.state.editableTicketData.values];
    newValues[x][y] = handleLottoInput(value);
    this.setState({ ...this.state.editableTicketData });
  };

  handleTicketNumberChange = e =>
    this.setState({
      editableTicketData: {
        ...this.state.editableTicketData,
        number: handleLottoTicketInput(e.target.value),
      },
    });

  addTicket = () => {
    // TODO: validate given ticket to be valid
    this.props.addTicket(this.state.editableTicketData);
  };

  render() {
    const { addTicket, ...props } = this.props;
    return (
      <Modal {...props}>
        <div className="text-center">
          <Ticket
            editableTicketData={this.state.editableTicketData}
            handleTicketNumberChange={this.handleTicketNumberChange}
            handleTicketInputChange={this.handleTicketInputChange}
            isEditable
          />
          <button
            type="button"
            className="btn btn-outline-secondary my-2"
            onClick={() => this.addTicket()}
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
