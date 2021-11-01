const display = document.querySelector('.display')
const calculatorButtons = document.querySelector(".buttons")

let operand1 = ""
let operand2 = ""
let operator = ""
let temp = ""


const add = (num1, num2) => {
    operand1 = parseInt(num1) + parseInt(num2)
    clearTemporalOperations()
    logCurrentState()
    return operand1
}

const substract = (num1, num2) => {
    operand1 = parseInt(num1) - parseInt(num2)
    clearTemporalOperations()
    logCurrentState()
    return operand1
}

const multiply = (num1, num2) => {
    operand1 = parseInt(num1) * parseInt(num2)
    clearTemporalOperations()
    logCurrentState()
    return operand1
}

const divide = (num1, num2) => {

    if (num2 == 0) {
        clearOperations()
        display.textContent = "Can't divide by 0. Start again."
        logCurrentState()
        return
    } else {
        operand1 = parseInt(num1) / parseInt(num2)
        clearTemporalOperations()
        logCurrentState()
        return operand1
    }
        
}

const concatValue = (event) => {
        temp += event.target.value
        display.textContent = temp
        logCurrentState()

}

const selectOperator = (event) => {
    if (temp === "" && operand1 === "" && operand2 === "") {
        display.textContent = "Error, please select a number first."
        logCurrentState()
        return
    } 

    else if (temp !== "" && operand1 === "" && operand2 === ""){
        operand1 = temp
        temp = ""
        operator = event.target.value
        logCurrentState()
        return
    }

    else if (operand1 !== "" && temp === "" && operand2 === ""){
        operator = event.target.value
        logCurrentState()
        return
    }

    else if (operand1 !== "" && temp !== "" && operand2 === ""){
        operand2 = temp
        temp = ""
        operate(operand1, operator, operand2)
        operator = event.target.value
        logCurrentState()
        return
    }
}

const addDecimal = (event) => {
         if (!temp.includes(".")) {
             temp += event.target.value
          } 
        display.textContent = temp   
}

const deleteValue = () => {
    temp = temp.slice(0, -1)
    display.textContent = temp
    logCurrentState()
}

const clearOperations = () => {
    operand1 = ""
    operand2 = ""
    operator = ""
    temp = ""
    display.textContent = temp
    logCurrentState()
}

const clearTemporalOperations = () => {
    if (!Number.isInteger(operand1)) {
      operand1 = parseFloat(operand1).toFixed(2)
    } 
    operand2 = ""
    operator = ""
    temp = ""
    display.textContent = operand1
    logCurrentState()
}

const checkForEqualSign = () => {
    if (operand1 !== "" && operand2 === "" && operator !== "" && temp === "") {
        clearOperations()
        display.textContent = "Invalid operation. Start again"
        return
    } else {
        operand2 = temp
        temp = ""
        operate(operand1, operator, operand2)
        logCurrentState()
        return
    }
}

const operate = (num1, selectedOperation, num2)=> {

    num1 = operand1
    selectedOperation = operator
    num2 = operand2

    if (selectedOperation === "+") {
        add(num1, num2)
    }

    if (selectedOperation === "-") {
        substract(num1, num2)
    }

    if (selectedOperation === "*") {
        multiply(num1, num2)
    }

    if (selectedOperation === "/") {
        divide(num1, num2)
    }

}

const logCurrentState = () => {
    console.log(`Op1 ${operand1}, Op2 ${operand2}, SelOp ${operator}, temp ${temp}`)
}

const checkForEvents = (event) => {
    if (event.target.classList.contains('number')) {
        logCurrentState()
        concatValue(event)
    }

    if (event.target.classList.contains('operator')) {
        logCurrentState()

        selectOperator(event) 
    }

    if (event.target.value === 'delete') {
        logCurrentState()

        deleteValue()
    }   

    if (event.target.value === ".") {
        logCurrentState()

        addDecimal(event)
    }
    
    if (event.target.value === 'clear') {
        logCurrentState()

        clearOperations()
    }

    if (event.target.value === 'equals') {
        logCurrentState()
        checkForEqualSign(event)
    }
}

calculatorButtons.addEventListener('click', checkForEvents)