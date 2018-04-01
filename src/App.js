import React, { Component } from 'react';
import cx from 'classnames';

import {
  Ticket,
  TicketPlaceholder,
  Sphere,
  Input,
  Status,
  ModalCreateTicket,
  ConfirmationModal,
} from './components';
import { handleLottoInput } from './utils';
import { DEMO_TICKETS } from './constants';

const STORAGE_KEY = 'appState';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.getInitialState() };
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
      modalCreateTicketOpen: false,
      confirmationModal: {
        isOpen: false,
        title: undefined,
        message: undefined,
        onConfirmed: undefined,
      },
    };

    return initialState;
  };

  componentDidMount() {
    if (window.localStorage) {
      const cache = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      if (cache != null) {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
          ...cache,
          value: '',
          modalCreateTicketOpen: false,
          confirmationModal: {
            isOpen: false,
            title: undefined,
            message: undefined,
            onConfirmed: undefined,
          },
        });
      }
    }
    window.addEventListener('beforeunload', this.componentUnmount);
  }

  componentWillUnmount() {
    this.componentUnmount();
  }

  getDemoTickets = () => {
    this.setState({ tickets: DEMO_TICKETS });
    this.disableEditMode();
  };

  setStatus = status => {
    this.setState({ status });
  };

  resetStatus = () => {
    this.setState({ status: this.getInitialState().status });
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  removeLocalStorage = () => {
    if (window.localStorage) window.localStorage.removeItem(STORAGE_KEY);
  };

  pushStateToStorage = () => {
    this.removeLocalStorage();
    if (window.localStorage)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  };

  addTicket = ticketData => {
    this.state.tickets.push(ticketData);
    this.closeCreateTicketModal();
    this.setStatus({ color: 'green', message: 'Bilietas pridėtas!' });
  };

  countOccurencies = number => {
    let occurenciesCount = 0;
    this.state.tickets.map(ticket => {
      const arr = ticket.values.toString().split(',');
      occurenciesCount += arr.reduce((a, v) => {
        if ((+v).toString() === number) {
          const increment = a + 1;
          return increment;
        }
        return a;
      }, 0);
      return true;
    });
    return occurenciesCount;
  };

  handleEnteredNumber = e => {
    this.setState({ value: handleLottoInput(e.target.value) });
  };

  crossOutNumber = number => {
    this.state.rolledValues.push(number.toString());
    const count = this.countOccurencies(number.toString());
    if (count > 0) {
      this.setStatus({
        color: 'green',
        message:
          count === 1
            ? `Išbrauktas ${count} langelis`
            : `Išbraukti ${count} langeliai`,
      });
    } else {
      this.setStatus({
        color: 'default',
        message: 'Nerasta',
      });
    }
  };

  handleEnteredNumberCrossout = e => {
    e.preventDefault();
    const { value } = this.state;
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
    this.confirm(
      {
        title: 'Ar tikrai?',
        message: 'Bus ištrinti bilietai ir kamuoliukų istorija.',
      },
      () => {
        this.removeLocalStorage();
        this.resetState();
      }
    );
  };

  removeLastRolledValue = () => {
    this.confirm(
      {
        title: 'Ar tikrai?',
        message: 'Bus pašalintas paskutinis ridentas kamuoliukas',
      },
      () => {
        this.setState({ rolledValues: this.state.rolledValues.slice(0, -1) });
        this.resetStatus();
      }
    );
  };

  handleIsClickableChange = () => {
    this.setState({
      options: {
        ...this.state.options,
        isTicketsClickable: !this.state.options.isTicketsClickable,
      },
    });
  };

  enableEditMode = () => {
    this.setState({
      options: {
        ...this.state.options,
        isEditMode: true,
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

  handleEditModeChange = () => {
    if (this.state.options.isEditMode) {
      this.disableEditMode();
    } else {
      this.enableEditMode();
    }
  };

  removeTicketByIndex = id => {
    this.confirm(
      {
        title: 'Ar tikrai?',
        message: 'Bus ištrintas pasirinktas bilietas.',
      },
      () => {
        this.setState({
          tickets: this.state.tickets.filter((item, index) => index !== id),
        });
        this.setStatus({ message: 'Bilietas ištrintas! ' });
      }
    );
  };

  componentUnmount = () => {
    this.pushStateToStorage();
    window.removeEventListener('beforeunload', this.componentUnmount);
  };

  openCreateTicketModal = () => {
    this.setState({ modalCreateTicketOpen: true });
  };

  closeCreateTicketModal = () => {
    this.setState({ modalCreateTicketOpen: false });
  };

  confirm = (data, onConfirmed) => {
    this.setState({
      confirmationModal: {
        isOpen: true,
        ...data,
        onConfirmed,
      },
    });
  };

  closeConfirmationModal = () => {
    this.setState({
      confirmationModal: {
        isOpen: false,
        title: undefined,
        message: undefined,
        onConfirm: undefined,
      },
    });
  };

  render() {
    const {
      rolledValues,
      value,
      status,
      options: { isTicketsClickable, isEditMode },
      tickets,
      modalCreateTicketOpen,
      confirmationModal,
    } = this.state;
    const isReadyForPlay = !!tickets.length;
    return (
      <div className="App">
        <ModalCreateTicket
          isOpen={modalCreateTicketOpen}
          addTicket={this.addTicket}
          onRequestClose={this.closeCreateTicketModal}
        />
        <ConfirmationModal
          {...confirmationModal}
          onRequestClose={this.closeConfirmationModal}
        />
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
                  {rolledValues.map((rolledValue, index) => (
                    <Sphere
                      key={index}
                      value={rolledValue}
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
                  ticketIndex={index}
                  onTicketRemove={isEditMode && this.removeTicketByIndex}
                  className="d-inline-block text-center my-2"
                  rolledValues={this.state.rolledValues}
                  isClickable={!isEditMode && isTicketsClickable}
                  clickHandler={this.crossOutNumber}
                  {...ticket}
                />
              </div>
            ))}
            {(isEditMode || !isReadyForPlay) && (
              <div className="col-12 col-md-6 col-lg-4">
                <TicketPlaceholder
                  startDemoHandler={this.getDemoTickets}
                  openCreateTicketModal={this.openCreateTicketModal}
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
