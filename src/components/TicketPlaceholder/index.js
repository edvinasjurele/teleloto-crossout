import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './index.css';

const TicketPlaceholder = ({
  className,
  demoHandler,
  addTicketHandler,
  isReadyForPlay,
  ...props
}) => (
  <div className={cx('TicketPlaceholder px-4 pb-5 pt-4', className)} {...props}>
    <div className="py-5 mt-3">
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary my-2"
          onClick={() => addTicketHandler()}
        >
          + Prideti bilietą
        </button>
      </div>
      {!isReadyForPlay && (
        <div>
          <button
            type="button"
            className="btn btn-outline-secondary my-2"
            onClick={() => demoHandler()}
          >
            Demonstracija
          </button>
        </div>
      )}
    </div>
  </div>
);

TicketPlaceholder.propTypes = {
  className: PropTypes.string,
};

TicketPlaceholder.defaultProps = {
  className: undefined,
};

export default TicketPlaceholder;
