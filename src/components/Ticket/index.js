import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TicketField from '../TicketField';

import './index.css';

const headerLetters = ['M', 'J', 'R', 'G', 'Ž'];

const Ticket = ({
  index,
  values,
  rolledValues,
  number,
  isClickable,
  clickHandler,
  onTicketRemove,
  className,
  ...props
}) => (
  <div className={cx('Ticket px-4 pb-3 pt-4', className)} {...props}>
    {onTicketRemove && (
      <a
        href="#remove"
        className="Ticket__close"
        onClick={() => onTicketRemove(index)}
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
        {values.map((row, index) => (
          <tr key={index}>
            {row.map((collumn, index2) => (
              <TicketField
                key={index2}
                isCrossedOut={rolledValues.includes(collumn.toString())}
                isClickable={isClickable}
                clickHandler={clickHandler}
                value={
                  collumn.toString().length === 1 ? `0${collumn}` : collumn
                }
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div className="TicketField__footer">
      {number && <p className="TicketField__ticket-number mt-2">{number}</p>}
    </div>
  </div>
);

Ticket.propTypes = {
  values: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  rolledValues: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

Ticket.defaultProps = {
  rolledValues: [],
  className: undefined,
};

export default Ticket;
