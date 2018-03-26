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
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      rolledValues: [],
      value: "",
      removeValue: ""
    };
    return initialState;
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  pushStateToStorage = () =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));

  crossOutNumber = number => {
    this.state.rolledValues.push(number);
    this.pushStateToStorage();
  };

  removeNumber = number => {
    console.log(this.state.rolledValues);

    const newRolledValues = this.state.rolledValues.filter(function(item) {
      return item !== number;
    });
    console.log(newRolledValues);
    this.setState({ rolledValues: newRolledValues });
  };

  handleInput = inputValue => {
    const regexDigits = /\D/;
    const regexTwoDigits = /(^[\d]{2})[\d]/;
    const value = inputValue
      .replace(regexDigits, "")
      .replace(regexTwoDigits, "$1");
    return value;
  };

  handleEnteredNumber = e => {
    this.setState({ value: this.handleInput(e.target.value) });
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

  invalidateCache = () => {
    if (
      window.confirm("Ar tikrai? Bus ištrinti bilietai ir kamuoliukų istorija.")
    ) {
      localStorage.removeItem(STORAGE_KEY);
      this.resetState();
    }
  };

  removeLastRolledValue = () => {
    if (
      window.confirm("Ar tikrai norite pašalinti paskutinį ridentą kamuoliuką?")
    ) {
      this.setState({ rolledValues: this.state.rolledValues.slice(0, -1) });
      this.pushStateToStorage();
    }
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
        <div className="App__header d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex flex-wrap">
            <form onSubmit={this.handleEnteredNumberCrossout} className="mr-3">
              <label htmlFor="numberToAdd">Pridėti: </label>
              <Input
                id="numberToAdd"
                value={this.state.value}
                onChange={this.handleEnteredNumber}
                className="ml-1 text-center"
              />
            </form>
          </div>
          <div>
            <a href="#is-naujo" onClick={this.invalidateCache}>
              Iš naujo
            </a>
          </div>
        </div>
        <div className="App__rolled-balls-bar">
          {rolledValues.length ? (
            <div className="d-flex align-items-center w-100">
              <div style={{ flex: 1 }}>
                {rolledValues.map((value, index) => (
                  <Ball key={index} value={value} className="d-inline-block" />
                ))}
              </div>
              <a
                href="#atgal"
                onClick={this.removeLastRolledValue}
                className="ml-2"
              >
                Trinti
              </a>
            </div>
          ) : (
            <div>Nėra išridentų kamuoliukų</div>
          )}
        </div>
        <div className="App__tickets text-center">
          <Ticket rolledValues={this.state.rolledValues} {...ticket1} />
          <Ticket rolledValues={this.state.rolledValues} {...ticket2} />
        </div>
      </div>
    );
  }
}

export default App;
