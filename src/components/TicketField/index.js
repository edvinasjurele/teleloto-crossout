import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import requiredIf from 'react-required-if';

import { EditableInput } from '../';

import './index.css';

class TicketField extends React.Component {
  handleEnteredNumber = e => {
    const { id, value } = e.target;
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
        role="presentation"
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
  id: requiredIf(PropTypes.string, props => props.isEditable),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: requiredIf(PropTypes.func, props => props.isEditable),
  clickHandler: requiredIf(PropTypes.func, props => props.shouldInteract),
  isCrossedOut: PropTypes.bool,
  isClickable: PropTypes.bool,
  isEditable: PropTypes.bool,
};

TicketField.defaultProps = {
  id: undefined,
  onChange: undefined,
  clickHandler: undefined,
  isCrossedOut: false,
  isClickable: false,
  isEditable: false,
};

export default TicketField;
