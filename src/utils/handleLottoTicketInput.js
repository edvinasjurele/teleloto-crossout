import filterDigits from './filterDigits';

const LIMIT = 7;

const handleLottoTicketInput = value => {
  const digits = filterDigits(value);
  return digits <= LIMIT ? digits : digits.slice(0, LIMIT);
};

export default handleLottoTicketInput;
