document.addEventListener('DOMContentLoaded', function() {
  const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('.button');
  let displayValue = '0';
  let firstValue = null;
  let operator = null;
  let waitingForSecondValue = false;

  function updateDisplay() {
    display.innerText = displayValue;
  }

  updateDisplay();

  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      const value = button.innerText;

      if (button.classList.contains('operator')) {
        handleOperator(value);
        return;
      }

      if (button.classList.contains('clear')) {
        clearDisplay();
        return;
      }

      if (button.classList.contains('equals')) {
        calculate();
        return;
      }

      if (value === '.') {
        inputDecimal(value);
        updateDisplay();
        return;
      }

      inputNumber(value);
      updateDisplay();
    });
  });

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
      operator = nextOperator;
      return;
    }

    if (firstValue === null && !isNaN(inputValue)) {
      firstValue = inputValue;
    } else if (operator) {
      const result = calculate();
      displayValue = `${parseFloat(result.toFixed(7))}`;
      firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
    updateDisplay();
  }

  function calculate() {
    if (operator && firstValue !== null && !waitingForSecondValue) {
      const secondValue = parseFloat(displayValue);

      let result;

      if (operator === '+') {
        result = firstValue + secondValue;
      } else if (operator === '-') {
        result = firstValue - secondValue;
      } else if (operator === '×') {
        result = firstValue * secondValue;
      } else if (operator === '÷') {
        result = firstValue / secondValue;
      } else if (operator === '%') {
        result = firstValue % secondValue;
      }

      displayValue = `${parseFloat(result.toFixed(7))}`;
      firstValue = result;
      operator = null;
      waitingForSecondValue = false;
      updateDisplay();
    }
  }

  function clearDisplay() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    updateDisplay();
  }

  function inputNumber(num) {
    if (waitingForSecondValue) {
      displayValue = num;
      waitingForSecondValue = false;
    } else {
      displayValue = displayValue === '0' ? num : displayValue + num;
    }
  }

  function inputDecimal(dot) {
    if (!displayValue.includes(dot)) {
      displayValue += dot;
    }
  }
  });
