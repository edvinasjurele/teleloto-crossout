import React, { Component } from "react";

import Ticket from "./components/Ticket";
import Sphere from "./components/Sphere";
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
        <div className="App__header pt-3 pb-2">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <div className="d-flex flex-wrap">
                <form onSubmit={this.handleEnteredNumberCrossout}>
                  <Input
                    id="numberToAdd"
                    placeholder="Įveskite kamuoliuką"
                    size="lg"
                    value={this.state.value}
                    onChange={this.handleEnteredNumber}
                  />
                </form>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-light btn-lg"
                  onClick={this.invalidateCache}
                >
                  Iš naujo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="App__balls-bar d-flex flex-wrap align-items-center">
          <div className="container">
            {rolledValues.length ? (
              <div className="d-flex align-items-center w-100">
                <div style={{ flex: 1 }}>
                  {rolledValues.map((value, index) => (
                    <Sphere
                      key={index}
                      value={value}
                      className="d-inline-block mr-1 my-1"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-light ml-2"
                  onClick={this.removeLastRolledValue}
                >
                  Trinti
                </button>
              </div>
            ) : (
              <div>Nėra išridentų kamuoliukų</div>
            )}
          </div>
        </div>
        <div className="container text-center">
          <div className="row mt-3">
            <div className="circle" />
            <div className="col-12 col-md-6 col-lg-4">
              <Ticket
                className="d-inline-block text-center my-2"
                rolledValues={this.state.rolledValues}
                {...ticket1}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Ticket
                className="d-inline-block text-center my-2"
                rolledValues={this.state.rolledValues}
                {...ticket2}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Ticket
                className="d-inline-block text-center my-2"
                rolledValues={this.state.rolledValues}
                {...ticket2}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
