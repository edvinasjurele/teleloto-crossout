import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { EditableInput } from '../';

import './index.css';

class TicketField extends React.Component {
  handleEnteredNumber = e => {
    const { id, value } = e.target;
    console.log(e.target);
    this.props.onChange({ id, value });
  };

  render() {
    const {
      value,
      id,
      isCrossedOut,
      isClickable,
      clickHandler,
      onChange,
      isEditable,
      ...props
    } = this.props;
    const shouldInteract = isClickable && !isCrossedOut && !isEditable;
    return (
      <td
        className={cx(
          'TicketField',
          { 'TicketField--crossed-out': isCrossedOut && !isEditable },
          { 'TicketField--clickable': shouldInteract },
          { 'TicketField--editable': isEditable }
        )}
        onClick={shouldInteract ? () => clickHandler(+value) : undefined}
        {...props}
      >
        {isEditable ? (
          <EditableInput
            placeholder="__"
            value={value}
            id={id}
            onChange={this.handleEnteredNumber}
            isTransparent
          />
        ) : (
          value
        )}
      </td>
    );
  }
}

TicketField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isCrossedOut: PropTypes.bool,
};

TicketField.defaultProps = {
  isCrossedOut: false,
};

export default TicketField;
