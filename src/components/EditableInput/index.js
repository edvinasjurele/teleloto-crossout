import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './index.css';

function EditableInput({ value, placeholder, id, onChange, isTransparent }) {
  return (
    <input
      type="text"
      className={cx('EditableInput text-center', {
        'EditableInput--transparent': isTransparent,
      })}
      placeholder={placeholder}
      value={value}
      id={id}
      onChange={onChange}
    />
  );
}

EditableInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isTransparent: PropTypes.bool,
};

EditableInput.defaultProps = {
  placeholder: undefined,
  isTransparent: undefined,
};

export default EditableInput;
