import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./index.css";

const Ball = ({ value, className }) => {
  const getBallColor = color => {
    if (value > 0 && value < 16) return "Ball--blue";
    if (value >= 16 && value < 31) return "Ball--black";
    if (value >= 31 && value < 46) return "Ball--red";
    if (value >= 46 && value < 61) return "Ball--yellow";
    if (value >= 61 && value < 76) return "Ball--green";
  };

  return (
    <div className={cx("Ball", className, getBallColor())}>
      {value.toString().length === 1 ? `0${value}` : value}
    </div>
  );
};

Ball.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string
};

Ball.defaultProps = {
  className: undefined
};

export default Ball;
