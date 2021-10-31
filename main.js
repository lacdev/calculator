const display = document.querySelector('.display')
const calculatorButtons = document.querySelector(".buttons")

let operand1 = ""
let operand2 = ""
let operator = ""
let temp = ""

const add = (num1, num2) => {
    temp = Number(num1) + Number(num2)
    clearTemporalOperations()
    return operand1
}

const substract = (num1, num2) => {
    temp = Number(num1) - Number(num2)
    clearTemporalOperations()
    return operand1
}

const multiply = (num1, num2) => {
    temp = Number(num1) * Number(num2)
    clearTemporalOperations()
    return operand1
}

const divide = (num1, num2) => {
        temp = Number(num1) / Number(num2)
        clearTemporalOperations()
        return operand1
}

const concatValue = (event) => {
    if (operand1 !== "") {
        operand2 += event.target.value
        display.textContent = operand2
    } else {
        temp += event.target.value
        display.textContent = temp
    }
}

const selectOperator = (event) => {
    operator = event.target.value
}

const addDecimal = (event) => {

    if (operand1 !== "") {
        operand2 += event.target.value
        display.textContent = operand2
    } else {
        temp += event.target.value
        display.textContent = temp
    }

}

const deleteValue = () => {

    if (operand1 !== "") {
        operand2 = operand2.slice(0, -1)
        display.textContent = operand2
    } else {
        temp = temp.slice(0, -1)
        display.textContent = temp
    }

}

const clearOperations = () => {
    operand1 = ""
    operand2 = ""
    temp = ""
    operator = ""
    display.textContent = temp
}

const clearTemporalOperations = () => {
    operand1 = temp
    if (!Number.isInteger(operand1)) {
      operand1 = parseFloat(operand1).toFixed(2)
    } 
    temp = ""
    operand2 = ""
    operator = ""
}

