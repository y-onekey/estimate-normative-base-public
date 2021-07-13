const isDecimal2orLess = (number) => {
  const numberArray = number.toString().split('.');
  if (numberArray.length === 1) {
    if (Number(number) !== 0) { return true; }
  }
  if (numberArray.length > 1) {
    const afterDotNumbers = number.toString().split('.')[1];
    if (afterDotNumbers === '0' || afterDotNumbers === '00') { return true; }
    if (afterDotNumbers.length <= 2) { return true; }
  }
  return false;
};

const checkDecimalsField = (valueName, fieldValues, temp, errorText) => {
  if (fieldValues[valueName] === '') {
    temp[valueName] = errorText;
  } else if (!isDecimal2orLess(fieldValues[valueName])) {
    temp[valueName] = 'Два знака после запятой.';
  } else {
    temp[valueName] = '';
  }
  return temp[valueName];
};

export {
  isDecimal2orLess,
  checkDecimalsField,
};
