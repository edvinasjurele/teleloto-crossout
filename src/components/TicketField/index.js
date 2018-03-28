import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './index.css';

const TicketField = ({
  value,
  isCrossedOut,
  isClickable,
  clickHandler,
  ...props
}) => {
  const shouldInteract = isClickable && !isCrossedOut;
  return (
    <td
      className={cx(
        'TicketField',
        { 'TicketField--crossed-out': isCrossedOut },
        { 'TicketField--clickable': shouldInteract }
      )}
      onClick={shouldInteract ? () => clickHandler(+value) : undefined}
      {...props}
    >
      {value}
    </td>
  );
};

TicketField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isCrossedOut: PropTypes.bool,
};

TicketField.defaultProps = {
  isCrossedOut: false,
};

export default TicketField;
