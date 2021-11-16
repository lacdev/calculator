const display = document.querySelector('.display')
const calculatorButtons = document.querySelector('.buttons')

let operand1 = ''
let operand2 = ''
let operator = ''
let temp = ''

const add = (num1, num2) => {
  operand1 = Number(num1) + Number(num2)
  clearTemporalOperations()
  return operand1
}

const substract = (num1, num2) => {
  operand1 = Number(num1) - Number(num2)
  clearTemporalOperations()
  return operand1
}

const multiply = (num1, num2) => {
  operand1 = Number(num1) * Number(num2)
  clearTemporalOperations()
  return operand1
}

const divide = (num1, num2) => {
  if (num2 == 0) {
    clearOperations()
    display.textContent = "Can't divide by 0. Start again."
    return
  } else {
    operand1 = Number(num1) / Number(num2)
    clearTemporalOperations()
    return operand1
  }
}

const concatValue = (event) => {
  if (operand1 !== '' && operand2 === '' && operator === '' && temp === '') {
    clearOperations()
    temp += event.target.value
    display.textContent = temp
  } else {
    temp += event.target.value
    display.textContent = temp
  }
}

const selectOperator = (event) => {
  if (temp === '' && operand1 === '' && operand2 === '') {
    display.textContent = 'Error, please select a number first.'
    return
  } else if (temp !== '' && operand1 === '' && operand2 === '') {
    operand1 = temp
    temp = ''
    operator = event.target.value
    return
  } else if (operand1 !== '' && temp === '' && operand2 === '') {
    operator = event.target.value
    return
  } else if (operand1 !== '' && temp !== '' && operand2 === '') {
    operand2 = temp
    temp = ''
    operate(operand1, operator, operand2)
    operator = event.target.value
    return
  }
}

const addDecimal = (event) => {
  if (!temp.includes('.')) {
    temp += event.target.value
  }
  display.textContent = temp
}

const deleteValue = () => {
  temp = temp.slice(0, -1)
  display.textContent = temp
}

const clearOperations = () => {
  operand1 = ''
  operand2 = ''
  operator = ''
  temp = ''
  display.textContent = temp
}

const clearTemporalOperations = () => {
  if (!Number.isInteger(operand1)) {
    operand1 = parseFloat(operand1).toFixed(2)
  }
  operand2 = ''
  operator = ''
  temp = ''
  display.textContent = operand1
}

const checkForEqualSign = () => {
  if (operand1 === '' && operand2 === '' && operator === '' && temp === '') {
    clearOperations()
    display.textContent =
      'Invalid operation. Select your first number and start again.'
    return
  }
  if (operand1 !== '' && operand2 === '' && operator !== '' && temp === '') {
    display.textContent = 'Please select your second number.'
    return
  }
  if (operand1 === '' && operand2 === '' && operator === '' && temp !== '') {
    display.textContent = 'Please select an operator and a second number.'
    return
  } else {
    operand2 = temp
    temp = ''
    operate(operand1, operator, operand2)
    return
  }
}

const operate = (num1, selectedOperation, num2) => {
  num1 = operand1
  selectedOperation = operator
  num2 = operand2

  if (selectedOperation === '+') {
    add(num1, num2)
  }

  if (selectedOperation === '-') {
    substract(num1, num2)
  }

  if (selectedOperation === '*') {
    multiply(num1, num2)
  }

  if (selectedOperation === '/') {
    divide(num1, num2)
  }
}

const checkForEvents = (event) => {
  if (event.target.classList.contains('number')) {
    concatValue(event)
  }

  if (event.target.classList.contains('operator')) {
    selectOperator(event)
  }

  if (event.target.value === 'delete') {
    deleteValue()
  }

  if (event.target.value === '.') {
    addDecimal(event)
  }

  if (event.target.value === 'clear') {
    clearOperations()
  }

  if (event.target.value === 'equals') {
    checkForEqualSign(event)
  }
}

calculatorButtons.addEventListener('click', checkForEvents)
