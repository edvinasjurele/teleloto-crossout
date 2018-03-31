import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import cx from 'classnames';

import { TicketField, EditableInput } from '../';
import './index.css';

import { handleLottoInput, handleLottoTicketInput, padZero } from '../../utils';

const headerLetters = ['M', 'J', 'R', 'G', 'Ž'];

class Ticket extends React.Component {
  state = {
    editableTicket: {
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

  handleInputChange = inputData => {
    const { id, value } = inputData;
    const [x, y] = id.split('_');
    const newValues = [...this.state.editableTicket.values];
    newValues[x][y] = handleLottoInput(value);
    this.setState({ ...this.state.editableTicket });
    // console.log(inputData);
    // console.log(this.state.editableTicket);
  };

  handleTicketNumberChange = e =>
    this.setState({
      editableTicket: {
        ...this.state.editableTicket,
        number: handleLottoTicketInput(e.target.value),
      },
    });

  render() {
    const {
      ticketIndex,
      values,
      rolledValues,
      number,
      isClickable,
      clickHandler,
      onTicketRemove,
      className,
      isEditable,
      ...props
    } = this.props;
    return (
      <div className={cx('Ticket px-4 pb-3 pt-4', className)} {...props}>
        {onTicketRemove && (
          <a
            href="#remove"
            className="Ticket__close"
            onClick={() => onTicketRemove(ticketIndex)}
          >
            ✕
          </a>
        )}
        <table className="mt-3">
          <thead>
            <tr>
              {headerLetters.map((letter, index) => (
                <TicketField key={index} value={letter} />
              ))}
            </tr>
          </thead>
          <tbody>
            {(isEditable ? this.state.editableTicket.values : values).map(
              (row, index) => (
                <tr key={index}>
                  {row.map((collumn, index2) => (
                    <TicketField
                      key={index2}
                      isCrossedOut={
                        !isEditable && rolledValues.includes(collumn.toString())
                      }
                      isClickable={isClickable}
                      clickHandler={clickHandler}
                      onChange={this.handleInputChange}
                      id={`${index}_${index2}`}
                      value={isEditable ? collumn : padZero(collumn)}
                      isEditable={isEditable}
                    />
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="TicketField__footer">
          <p className="TicketField__ticket-number mt-2">
            {isEditable ? (
              <EditableInput
                placeholder="_______"
                value={this.state.editableTicket.number}
                id="ticketNumber"
                onChange={this.handleTicketNumberChange}
                isTransparent
              />
            ) : (
              number
            )}
          </p>
        </div>
      </div>
    );
  }
}

Ticket.propTypes = {
  ticketIndex: PropTypes.number,
  values: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  rolledValues: PropTypes.arrayOf(PropTypes.string),
  number: PropTypes.string.isRequired,
  className: PropTypes.string,
  isClickable: PropTypes.bool,
  isEditable: PropTypes.bool,
  clickHandler: requiredIf(PropTypes.func, props => props.isEditable),
  onTicketRemove: requiredIf(PropTypes.func, props => props.isEditable),
};

Ticket.defaultProps = {
  rolledValues: [],
  ticketIndex: undefined,
  className: undefined,
  isClickable: undefined,
  isEditable: undefined,
  clickHandler: undefined,
  onTicketRemove: undefined,
};

export default Ticket;
