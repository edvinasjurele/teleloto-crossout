const handleLottoInput = inputValue => {
  const regexDigits = /\D/;
  const value = inputValue.replace(regexDigits, '');

  // dissalow first digit to be >7
  if (value.length === 1 && value > 7) return '';

  if (value.length === 2) {
    const firstDigit = +value.toString()[0];
    const secondDigit = +value.toString()[1];

    // dissalow 00
    if (firstDigit === 0 && secondDigit === 0) return firstDigit;

    // dissalow more than 75
    if (firstDigit >= 7 && secondDigit > 5) return firstDigit;

    return value;
  }
  return value.toString().slice(0, 2);
};

export default handleLottoInput;
