import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './index.css';

const Status = ({ color, message }) => {
  const colorClass = {
    green: 'Status--green',
  }[color];

  return <p className={cx('Status d-inline-block', colorClass)}>{message}</p>;
};

Status.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['green', 'default']).isRequired,
};

export default Status;
