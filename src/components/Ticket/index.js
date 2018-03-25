import React from "react";
import PropTypes from "prop-types";
import TicketField from "../TicketField";

import "./index.css";

const headerLetters = ["M", "J", "R", "G", "Ž"];

const Ticket = ({ values, rolledValues, number, ...props }) => (
  <div className="Ticket">
    <table {...props}>
      <thead>
        <tr>
          {headerLetters.map((letter, index) => (
            <TicketField key={index} value={letter} />
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          <tr key={index}>
            {row.map((collumn, index2) => (
              <TicketField
                key={index2}
                isCrossedOut={rolledValues.includes(collumn.toString())}
                value={
                  collumn.toString().length === 1 ? `0${collumn}` : collumn
                }
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div className="TicketField__footer">
      {number && <p className="TicketField__ticket-number">{number}</p>}
    </div>
  </div>
);

Ticket.propTypes = {
  values: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  rolledValues: PropTypes.arrayOf(PropTypes.string)
};

Ticket.defaultProps = {
  rolledValues: []
};

export default Ticket;
