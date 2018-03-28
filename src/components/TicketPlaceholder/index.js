import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './index.css';

const TicketPlaceholder = ({ className, ...props }) => (
  <div className={cx('TicketPlaceholder px-4 pb-5 pt-4', className)} {...props}>
    <div className="py-5 mt-3">
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary my-2"
          onClick={() => console.log('ddd')}
        >
          + Prideti bilietą
        </button>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary my-2"
          onClick={() => console.log('ddd')}
        >
          Demonstracija
        </button>
      </div>
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
