let input = [];
let inputArray = [];
let operation = [];
let resultValue = [];
let proceedCalc = false;
let isDecimal = false;
const operationArray = ['+', '-', '*', '/'];
const buttons = document.querySelectorAll('button');
const inputButtons = document.querySelectorAll('.input')
const inputValues = document.querySelector('#input-value');
const result = document.querySelector('#result');
const clear = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const equal = document.querySelector('#equal');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const decimalBtn = document.querySelector('#decimal');
const negative = document.querySelector('#negative');
const moduloBtn = document.querySelector('#modulo');
const powerBtn = document.querySelector('#power');
const factorialBtn = document.querySelector('#factorial');
const addBtn = document.querySelector('#add');
const subtractBtn = document.querySelector('#subtract');
const multiplyBtn = document.querySelector('#multiply');
const divideBtn = document.querySelector('#divide');

buttons.forEach(button => highlightBtn(button));


document.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter') {
        equal.click();
    }
    
    if(document.querySelector(`[data-key="${event.key}"]`)) {
        document.querySelector(`[data-key="${event.key}"]`).click();
        event.target.blur();
    }
});

document.addEventListener('click', (event) => {
    event.target.blur();
});

clear.addEventListener('click', () => {
    input = [];
    inputArray = [];
    operation = [];
    inputValues.textContent = '';
    result.textContent = '';
});

deleteBtn.addEventListener('click', () => {
    let removed = input.pop();
    if(removed == operation) operation = [];
    inputArray = input.join('');
    inputValues.textContent = input.join('');
    result.textContent = '';
});

decimalBtn.addEventListener('click', () => {
    if(!isDecimal) {
        input.push(decimalBtn.innerHTML);
        inputValues.textContent = input.join('');
        inputArray = input.join('');
    }
    isDecimal = true;
});

negative.addEventListener('click', () => {
    if(operation.length == 0) {
        if(String(input)[0] != negative.dataset.symbol){
            input.unshift(negative.dataset.symbol)
            proceedCalc = true;
        }
        else {
            let input_str = String(input);
            input = [];
            input.push(input_str.substring(1));
        }
    }
    else {
        if(inputArray[inputArray.indexOf(operation, 1)+1] != negative.dataset.symbol) {
            input.splice(input.indexOf(operation, 1)+1, 0, negative.dataset.symbol);
            }
        else {
            input.splice(input.indexOf(operation, 1)+1, 1);
        }
    }
    inputArray = input.join('');
    inputValues.textContent = input.join('');
});

numbers.forEach(button => {
    button.addEventListener('click', () => {
        if(!proceedCalc){
            input = [];
            inputArray = [];
            proceedCalc = true;
            result.textContent = '';
        }
        input.push(button.innerHTML);
        inputValues.textContent = input.join('');
        inputArray = input.join('');
    })
});

operations.forEach(button => {
    button.addEventListener('click', () => {
        proceedCalc = true;
        isDecimal = false;
        if(operation.length == 0) {
            operation = button.dataset.symbol;
            input.push(button.dataset.symbol);
            inputArray = input.join('');
            inputValues.textContent = input.join(''); 
        }
        else if(operationArray.includes(input[input.length-1])) {
            if(input[input.length-1] != button.dataset.symbol) {
                input.pop();
                input.push(button.dataset.symbol);
                operation = button.dataset.symbol;
                inputArray = input.join('');
                inputValues.textContent = input.join('');
            }
        }
    });
});

equal.addEventListener('click', evaluateInput);

function sum(a, b) {
    return Number(a) + Number(b);
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

function modulo(a, b) {
    return a % b;
}

function power(a, b) {
    return a**b;
}

function factorial(a, b) {
    let result = 1;
    if(a < 0) return NaN;
    if(a === 0) return 1;
    else{
        for(let i = 1; i <= a; i++){
        result *= i;
        }
        if(b === '') return result;
        else return result * b;
    }
}

function operate(symbol='', a, b) {
    if(symbol === moduloBtn.dataset.symbol) return modulo(a, b);
    if(symbol === addBtn.dataset.symbol) return sum(a, b);
    if(symbol === subtractBtn.dataset.symbol) return subtract(a, b);
    if(symbol === multiplyBtn.dataset.symbol) return multiply(a, b);
    if(symbol === divideBtn.dataset.symbol) return divide(a, b);
    if(symbol === powerBtn.dataset.symbol) return power(a, b);
    if(symbol === factorialBtn.dataset.symbol) return factorial(a, b);
}

function evaluateInput() {
    rounding_decimal = 4;
    if(operation != 0) {
        if(operation === subtractBtn.dataset.symbol){
            if(inputArray[0][0] !== negative.dataset.symbol) {
                inputArray = splitCustom(inputArray, inputArray.indexOf(operation, 1));
            }
            else {
                inputArray = splitCustom(inputArray, inputArray.indexOf(operation, 1));
            }
        }
        else {
            inputArray = splitCustom(inputArray, inputArray.indexOf(operation, 1));
        }
        resultValue = Math.round(operate(operation, inputArray[0], inputArray[1]) * 10**rounding_decimal)/10**rounding_decimal;
    }
    else {
        resultValue = Math.round(inputArray * 10**rounding_decimal)/10**rounding_decimal;
    }
    result.textContent = resultValue;
    input = [];
    input.push(resultValue);
    operation = [];
    inputArray = resultValue;
    proceedCalc = false;
    isDecimal = false;
}

function splitCustom(str, index) {
    const result = [str.slice(0, index), str.slice(index + 1)];
    return result;
}

function highlightBtn(button) {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
    });
    button.addEventListener('transitionend', () => {
        button.classList.remove('clicked');
    });
}