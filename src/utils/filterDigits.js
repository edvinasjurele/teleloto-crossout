const regexDigits = /\D/;
const filterDigits = string => string.replace(regexDigits, '');

export default filterDigits;
