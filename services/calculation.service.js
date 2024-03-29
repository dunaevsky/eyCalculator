module.exports = {
  eyCalc, eyCalcComplex
};

/**
 *
 * @param operations - array of operations to invoke on elements
 * @param elements - array of elements, should be size operation+1, works anyway
 * @returns {*}
 */
function eyCalcComplex({operations, elements}) {
  let result = elements[0];

  for (let i=0; i< operations.length; i++){
    const currOperation = operations[i];
    const currElements = elements[i+1]? [result, elements[i+1]]: [result];
    result = eyCalc({operation: currOperation, elements: currElements});
  }

  return result;
}

/**
 *
 * @param operation - string to decide which calculation to use
 * @param elements array of numbers
 * @returns string operation chosen or err
 */
function eyCalc({operation, elements}) {
  switch (operation.toLowerCase()) {
    case 'multiply':
      return eyMultiply(elements);
    case 'divide':
      return eyDivide(elements);
    case 'add':
      return eyAdd(elements);
    case 'subtract':
      return eySub(elements);
    default:
      throw {err: 'unknown operation', statusCode: 422};
  }
}

function eyAdd(numbersArray) {
  const result = numbersArray.reduce((acc, elem) => (add(acc, elem)).toFixed(9), 0);

  if (isNaN(result)) {
    throw {err: 'there was an error in adding'};
  }

  return result;
}

/**
 *
 * @param numbersArray
 * @returns string or error
 */
function eySub(numbersArray) {
  const initial = numbersArray[0];
  const result = numbersArray.slice(1).reduce((acc, elem) => (subtract(acc, elem)).toFixed(9), initial);

  if (isNaN(result)) {
    throw {err: 'there was an error in subtraction'};
  }

  return result;
}


/**
 * Returns the result  of multiplication of result of numbers array or error.
 * @param numbersArray an array on numbers to multiply
 */
function eyMultiply(numbersArray) {

  const result = numbersArray.reduce((acc, elem) => (multiply(acc, elem)).toFixed(9), 1);

  if (isNaN(result)) {
    throw {err: 'there was an error in multiply'};
  }

  return result;
}

/**
 * Returns the result of division of all numbers in given array or error.
 * @param numbersArray an array on numbers to divide
 */
function eyDivide(numbersArray) {

  const initial = numbersArray[0];
  if (initial < Number.EPSILON) return 0;
  const result = numbersArray.slice(1).reduce((acc, elem) => divide(acc, elem).toFixed(9), initial);

  if (isNaN(result)) {
    throw {err: 'there was an error in division'};
  }

  return result;
}

function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
