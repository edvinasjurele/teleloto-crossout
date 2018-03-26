import React, { Component } from "react";
import "./App.css";

import Ticket from "./components/Ticket";
import Ball from "./components/Ball";
import Input from "./components/Input";

const STORAGE_KEY = "appState";

const ticket1 = {
  values: [
    [5, 16, 42, 49, 65],
    [7, 23, 44, 46, 72],
    [11, 26, 43, 50, 64],
    [14, 29, 35, 48, 66],
    [6, 24, 41, 60, 69]
  ],
  number: "0642953"
};

const ticket2 = {
  values: [
    [7, 27, 39, 51, 66],
    [11, 20, 33, 49, 68],
    [8, 18, 45, 57, 75],
    [13, 21, 36, 53, 65],
    [10, 30, 37, 52, 72]
  ],
  number: "0657387"
};

class App extends Component {
  state = {
    rolledValues: [],
    value: ""
  };

  crossOutNumber = number => {
    this.state.rolledValues.push(number);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  };

  handleEnteredNumber = e => {
    const inputValue = e.target.value;
    const regexDigits = /\D/;
    const regexTwoDigits = /(^[\d]{2})[\d]/;
    const value = inputValue
      .replace(regexDigits, "")
      .replace(regexTwoDigits, "$1");
    this.setState({ value });
  };

  handleEnteredNumberCrossout = e => {
    e.preventDefault();
    const value = this.state.value;
    if (
      value.length >= 1 &&
      value >= 1 &&
      value <= 75 &&
      !this.state.rolledValues.includes(value)
    ) {
      this.crossOutNumber(value);
    }
    this.setState({ value: "" });
  };

  componentWillMount() {
    var cache = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (cache != null) {
      this.setState({ ...cache, value: "" });
    }
  }

  render() {
    const { rolledValues } = this.state;
    return (
      <div className="App">
        <div className="App__header">
          <form onSubmit={this.handleEnteredNumberCrossout}>
            <label htmlFor="ticketNumber">Įveskite skaičių: </label>
            <Input
              id="ticketNumber"
              value={this.state.value}
              onChange={this.handleEnteredNumber}
            />
          </form>
        </div>
        <div className="App__rolled-balls-bar">
          {rolledValues.length ? (
            rolledValues.map((value, index) => (
              <Ball key={index} value={value} />
            ))
          ) : (
            <div>Nėra išridentų kamuoliukų</div>
          )}
        </div>
        <div className="App__tickets">
          <Ticket rolledValues={this.state.rolledValues} {...ticket1} />
          <Ticket rolledValues={this.state.rolledValues} {...ticket2} />
        </div>
      </div>
    );
  }
}

export default App;
