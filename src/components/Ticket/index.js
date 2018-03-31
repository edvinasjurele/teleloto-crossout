import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import cx from 'classnames';

import { TicketField, EditableInput } from '../';
import './index.css';

import { padZero } from '../../utils';

const headerLetters = ['M', 'J', 'R', 'G', 'Ž'];

function Ticket({
  ticketIndex,
  values,
  editableTicketData,
  handleTicketNumberChange,
  handleTicketInputChange,
  rolledValues,
  number,
  isClickable,
  clickHandler,
  onTicketRemove,
  className,
  isEditable,
  noBackground,
  ...props
}) {
  return (
    <div
      className={cx(
        'Ticket px-4 pb-3 pt-4',
        { 'bg-lotto': !noBackground },
        className
      )}
      {...props}
    >
      {onTicketRemove && (
        <div
          className="Ticket__close"
          onClick={() => onTicketRemove(ticketIndex)}
          role="presentation"
        >
          ✕
        </div>
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
          {(isEditable ? editableTicketData.values : values).map(
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
                    onChange={handleTicketInputChange}
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
              value={editableTicketData.number}
              id="ticketNumber"
              onChange={handleTicketNumberChange}
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

Ticket.propTypes = {
  noBackground: PropTypes.bool,
  ticketIndex: PropTypes.number,
  values: requiredIf(
    PropTypes.arrayOf(PropTypes.array),
    props => !props.isEditable
  ),
  rolledValues: PropTypes.arrayOf(PropTypes.string),
  number: requiredIf(PropTypes.string, props => !props.isEditable),
  className: PropTypes.string,
  isClickable: PropTypes.bool,
  isEditable: PropTypes.bool,
  clickHandler: requiredIf(PropTypes.func, props => !props.isEditable),
  onTicketRemove: requiredIf(PropTypes.func, props => props.isEditMode),
  editableTicketData: requiredIf(
    PropTypes.shape({
      values: PropTypes.arrayOf(PropTypes.array).isRequired,
      number: PropTypes.string.isRequired,
    }),
    props => props.isEditable
  ),
  handleTicketNumberChange: requiredIf(
    PropTypes.func,
    props => props.isEditable
  ),
  handleTicketInputChange: requiredIf(
    PropTypes.func,
    props => props.isEditable
  ),
};

Ticket.defaultProps = {
  noBackground: false,
  values: undefined,
  number: undefined,
  rolledValues: [],
  ticketIndex: undefined,
  className: undefined,
  isClickable: undefined,
  isEditable: undefined,
  clickHandler: undefined,
  onTicketRemove: undefined,
  editableTicketData: undefined,
  handleTicketNumberChange: undefined,
  handleTicketInputChange: undefined,
};

export default Ticket;
