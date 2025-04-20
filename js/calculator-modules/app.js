// Import the calculate function from the perform-calculations module
import { calculate } from './perform-calculations.js'

// Object to hold the current state of the calculator
const calculator = {
  displayValue: '0',             // String that holds the number currently shown on screen
  firstOperand: null,            // Stores the first operand for any calculation
  waitingForSecondOperand: false,// Indicates if the next digit entered is the second operand
  operator: null                 // Stores the operator selected (+, -, *, /)
};

// Handles digit input
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  // If waiting for second operand, replace the display with the new digit
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // If display is '0', replace it; otherwise, append the new digit
    calculator.displayValue =
      displayValue === '0' ? digit : displayValue + digit;
  }
}

// Handles decimal point input
function inputDecimal(dot) {
  // Start new number if waiting for second operand
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.';
    calculator.waitingForSecondOperand = false;
    return;
  }

  // Append the decimal only if it's not already present
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

// Handles operator input (+, -, *, /)
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  // If operator is set and waiting for second operand, update the operator
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  // If this is the first operator pressed
  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    // Perform the calculation
    const currentValue = firstOperand || 0;
    const result = calculate(currentValue, inputValue, operator);

    // Update display and firstOperand with the result
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  // Now wait for the second operand
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

// Resets calculator to its initial state
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// Updates the value shown on the calculator screen
function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

// Initialize the display with default value
updateDisplay();

// Set up event listeners on all calculator keys
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  // Operator buttons (+, -, *, /)
  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  // Decimal point button
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  // Clear button (AC)
  if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  // Handle number input
  inputDigit(target.value);
  updateDisplay();
});
