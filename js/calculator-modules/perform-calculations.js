// Export the calculate function so it can be imported and used in other modules
export function calculate(firstOperand, secondOperand, operator) {
  
  // Perform addition
  if (operator === '+') {
    return firstOperand + secondOperand;

  // Perform subtraction
  } else if (operator === '-') {
    return firstOperand - secondOperand;

  // Perform multiplication
  } else if (operator === '*') {
    return firstOperand * secondOperand;

  // Perform division
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  // If no valid operator is provided, return the second operand as-is
  return secondOperand;
}
