import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./index.css";

const Input = ({ className, size, ...props }) => {
  const inputSize = {
    lg: "form-control-lg",
    sm: "form-control-sm"
  }[size];

  return (
    <input
      type="text"
      {...props}
      className={cx("Input form-control", inputSize, className)}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["lg", "sm", undefined])
};

Input.defaultProps = {
  className: undefined,
  size: undefined
};

export default Input;
