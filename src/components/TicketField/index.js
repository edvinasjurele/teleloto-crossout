import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./index.css";

const TicketField = ({ value, isCrossedOut, ...props }) => (
  <td
    className={cx("TicketField", { "TicketField--crossed-out": isCrossedOut })}
    {...props}
  >
    {value}
  </td>
);

TicketField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isCrossedOut: PropTypes.bool
};

TicketField.defaultProps = {
  isCrossedOut: false
};

export default TicketField;
