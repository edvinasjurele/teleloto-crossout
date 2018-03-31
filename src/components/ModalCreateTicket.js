import React from 'react';
import PropTypes from 'prop-types';
import _unique from 'lodash.uniq';
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
    errorMessages: [],
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
    const { number, values } = this.state.editableTicketData;

    const isNumberValid = number.length === 7;

    const singleArray = values.toString().split(',');
    const allValuesOK = !singleArray.includes('') && !singleArray.includes('0');
    const allValuesUnique = singleArray.length === _unique(singleArray).length;

    if (allValuesOK && isNumberValid && allValuesUnique) {
      this.setState({ errorMessages: [] });
      this.props.addTicket(this.state.editableTicketData);
    } else {
      const errorMessages = [];
      if (!isNumberValid) errorMessages.push('Netinkamas bilieto numeris');
      if (!allValuesOK)
        errorMessages.push('Yra tuščių arba netinkamų laukų verčių');
      if (isNumberValid && allValuesOK && !allValuesUnique)
        errorMessages.push('Yra pasikartojančių bilieto laukų');
      this.setState({ errorMessages });
    }
  };

  render() {
    const { addTicket, ...props } = this.props;
    return (
      <Modal {...props} className="bg-lotto">
        <div className="text-center">
          <Ticket
            editableTicketData={this.state.editableTicketData}
            handleTicketNumberChange={this.handleTicketNumberChange}
            handleTicketInputChange={this.handleTicketInputChange}
            isEditable
          />
          <div className="px-4 pb-2">
            <div className="text-left text-danger pb-2">
              {this.state.errorMessages.map((message, index) => (
                <p key={index}>&bull; {message}</p>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-block my-2"
              onClick={() => this.addTicket()}
            >
              + Pridėti
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

ModalCreateTicket.propTypes = {
  addTicket: PropTypes.func.isRequired,
};

export default ModalCreateTicket;
