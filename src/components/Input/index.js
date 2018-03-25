import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./index.css";

const Input = ({ className, ...props }) => (
  <input type="text" {...props} className={cx("Input", className)} />
);

Input.propTypes = {
  className: PropTypes.string
};

Input.defaultProps = {
  className: undefined
};

export default Input;
