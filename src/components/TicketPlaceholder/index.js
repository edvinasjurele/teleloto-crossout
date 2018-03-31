import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './index.css';

const TicketPlaceholder = ({
  className,
  startDemoHandler,
  openCreateTicketModal,
  isReadyForPlay,
  ...props
}) => (
  <div
    className={cx(
      'TicketPlaceholder align-items-center d-flex justify-content-center my-2 px-4',
      className
    )}
    {...props}
  >
    <div>
      <button
        type="button"
        className="btn btn-outline-secondary my-2"
        onClick={() => openCreateTicketModal()}
      >
        + Prideti bilietą
      </button>
      {!isReadyForPlay && (
        <button
          type="button"
          className="btn btn-outline-secondary my-2"
          onClick={() => startDemoHandler()}
        >
          Demonstracija
        </button>
      )}
    </div>
  </div>
);

TicketPlaceholder.propTypes = {
  className: PropTypes.string,
  startDemoHandler: PropTypes.func.isRequired,
  openCreateTicketModal: PropTypes.func.isRequired,
  isReadyForPlay: PropTypes.bool.isRequired,
};

TicketPlaceholder.defaultProps = {
  className: undefined,
};

export default TicketPlaceholder;
