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

const operate = (num1, selectedOperation, num2)=> {

    num1 = operand1
    selectedOperation = operator
    num2 = operand2

    if (selectedOperation === "+") {
        add(num1, num2)
        display.textContent = operand1
    }

    if (selectedOperation === "-") {
        substract(num1, num2)
        display.textContent = operand1
    }

    if (selectedOperation === "*") {
        multiply(num1, num2)
        display.textContent = operand1
    }

    if (selectedOperation === "/" && num2 !== 0) {
        divide(num1, num2)
        display.textContent = operand1
    } 
    
    if (selectedOperation === "/" && num2 == 0) {
        clearOperations()
        temp = "Can't divide by 0. Start again by pressing AC."
        display.textContent = temp
    }

}

const checkForEvents = (event) => {
    if (event.target.classList.contains('number')) {
        concatValue(event)
    }

    if (event.target.classList.contains('operator')) {
        selectOperator(event)
        if (operand1 === "") {
            operand1 = temp
            temp = ""
        }
        display.textContent = temp
    }

    if (event.target.value === 'delete') {
        deleteValue()
    }   

    if (event.target.value === "." && (!temp.includes(".") && !operand2.includes("."))) {
        addDecimal(event)
    }
    
    if (event.target.value === 'clear') {
        clearOperations()
    }

    if (event.target.value === 'equals') {
        if (operator === "" || operand2 === "") {
            clearOperations()
            display.textContent = 'Invalid operation start again by pressing AC.'
        } else {
        operate(operand1, operator, operand2)
        }
    }
}

calculatorButtons.addEventListener('click', checkForEvents)