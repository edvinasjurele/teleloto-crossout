import React, { Component } from 'react';
import cx from 'classnames';

import { Ticket, TicketPlaceholder, Sphere, Input, Status } from './components';
const STORAGE_KEY = 'appState';

const demoTickets = [
  {
    values: [
      [5, 16, 42, 49, 65],
      [7, 23, 44, 46, 72],
      [11, 26, 43, 50, 64],
      [14, 29, 35, 48, 66],
      [6, 24, 41, 60, 69],
    ],
    number: '0642953',
  },
  {
    values: [
      [7, 27, 39, 51, 66],
      [11, 20, 33, 49, 68],
      [8, 18, 45, 57, 75],
      [13, 21, 36, 53, 65],
      [10, 30, 37, 52, 72],
    ],
    number: '0657387',
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      rolledValues: [],
      value: '',
      removeValue: '',
      status: {
        color: 'default',
        message: '',
      },
      options: {
        isTicketsClickable: false,
        isEditMode: false,
      },
      tickets: [],
    };

    return initialState;
  };

  getDemoTickets = () => {
    this.setState({ tickets: demoTickets });
    this.disableEditMode();
  };

  addTicket = () => {
    console.log('TODO: Add a ticket functionality');
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  removeLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  pushStateToStorage = () => {
    this.removeLocalStorage();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  };

  setStatusMessage = (color, message) => {
    this.setState({ status: { color, message } });
  };

  resetStatusMessage = () => {
    this.setState({ status: this.getInitialState().status });
  };

  countOccurencies = number => {
    let occurenciesCount = 0;
    this.state.tickets.map(ticket => {
      const arr = ticket.values.toString().split(',');
      occurenciesCount += arr.reduce((a, v) => (v === number ? ++a : a), 0);
      return true;
    });
    return occurenciesCount;
  };

  crossOutNumber = number => {
    this.state.rolledValues.push(number.toString());
    const count = this.countOccurencies(number);
    if (count > 0) {
      count === 1
        ? this.setStatusMessage('green', `Išbrauktas ${count} langelis`)
        : this.setStatusMessage('green', `Išbraukti ${count} langeliai`);
    } else {
      this.setStatusMessage('default', 'Nerasta');
    }
  };

  handleInput = inputValue => {
    const regexDigits = /\D/;
    const regexTwoDigits = /(^[\d]{2})[\d]/;
    const value = inputValue
      .replace(regexDigits, '')
      .replace(regexTwoDigits, '$1');
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
    this.setState({ value: '' });
  };

  invalidateCache = () => {
    if (
      window.confirm('Ar tikrai? Bus ištrinti bilietai ir kamuoliukų istorija.')
    ) {
      this.removeLocalStorage();
      this.resetState();
    }
  };

  removeLastRolledValue = () => {
    if (
      window.confirm('Ar tikrai norite pašalinti paskutinį ridentą kamuoliuką?')
    ) {
      this.setState({ rolledValues: this.state.rolledValues.slice(0, -1) });
      this.resetStatusMessage();
    }
  };

  componentUnmount = () => {
    this.pushStateToStorage();
    window.removeEventListener('beforeunload', this.componentUnmount);
  };

  componentWillMount() {
    var cache = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (cache != null) {
      this.setState({ ...cache, value: '' });
    }
    window.addEventListener('beforeunload', this.componentUnmount);
  }

  componentWillUnmount() {
    this.componentUnmount();
  }

  handleIsClickableChange = () => {
    this.setState({
      options: {
        ...this.state.options,
        isTicketsClickable: !this.state.options.isTicketsClickable,
      },
    });
  };

  handleEditModeChange = () => {
    this.setState({
      options: {
        ...this.state.options,
        isEditMode: !this.state.options.isEditMode,
      },
    });
  };

  disableEditMode = () => {
    this.setState({
      options: {
        ...this.state.options,
        isEditMode: false,
      },
    });
  };

  removeTicketByIndex = id => {
    if (window.confirm('Ar tikrai? Bus ištrintas pasirinktas bilietas.')) {
      this.setState({
        tickets: this.state.tickets.filter((item, index) => index !== id),
      });
    }
  };

  render() {
    const {
      rolledValues,
      value,
      status,
      options: { isTicketsClickable, isEditMode },
      tickets,
    } = this.state;
    const isReadyForPlay = !!tickets.length;
    return (
      <div className="App">
        <div className="App__header pt-3 pb-2">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 py-1">
                <form
                  onSubmit={this.handleEnteredNumberCrossout}
                  className="mr-0 mr-md-3"
                >
                  <Input
                    id="numberToAdd"
                    placeholder="Įveskite kamuoliuką"
                    size="lg"
                    value={value}
                    disabled={!isReadyForPlay || isEditMode}
                    onChange={this.handleEnteredNumber}
                  />
                </form>
              </div>
              <div className="col-12 col-md-6 py-1">
                <div className="row">
                  <div className="col-6 align-items-center d-flex">
                    <Status {...status} />
                  </div>
                  <div className="col-6 text-right">
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
              <div className="text-center text-sm-left">
                Nėra išridentų kamuoliukų
              </div>
            )}
          </div>
        </div>
        <div className="container text-center">
          <div className="row mt-3">
            {tickets.map((ticket, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <Ticket
                  index={index}
                  onTicketRemove={
                    isEditMode
                      ? value => this.removeTicketByIndex(value)
                      : undefined
                  }
                  className="d-inline-block text-center my-2"
                  rolledValues={this.state.rolledValues}
                  isClickable={isTicketsClickable}
                  clickHandler={value => this.crossOutNumber(value)}
                  {...ticket}
                />
              </div>
            ))}
            {(isEditMode || !isReadyForPlay) && (
              <div className="col-12 col-md-6 col-lg-4">
                <TicketPlaceholder
                  demoHandler={this.getDemoTickets}
                  addTicketHandler={this.addTicket}
                  isReadyForPlay={isReadyForPlay}
                  className="my-2"
                />
              </div>
            )}
          </div>
        </div>
        {isReadyForPlay && (
          <div className="container">
            <div className="row my-4">
              <div className="col-12 mb-2">
                <p>Nustatymai:</p>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <label
                    className={cx('form-check-label', { muted: isEditMode })}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkbox_click_mode"
                      checked={isTicketsClickable}
                      disabled={isEditMode}
                      onChange={this.handleIsClickableChange}
                    />
                    Bilietų interaktyvumas
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkbox_edit_mode"
                      checked={isEditMode}
                      onChange={this.handleEditModeChange}
                    />
                    Redagavimo režimas
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
