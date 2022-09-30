let input = [];
let inputArray = [];
let operation = [];
let resultValue = [];
let proceedCalc = false;
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

clear.addEventListener('click', () => {
    input = [];
    inputArray = [];
    operation = [];
    inputValues.textContent = '';
    result.textContent = '';
});

deleteBtn.addEventListener('click', () => {
    input.pop();
    inputValues.textContent = input.join('');
    result.textContent = '';
});

numbers.forEach(button => {
    button.addEventListener('click', () => {
        if(!proceedCalc){
            input = [];
            inputArray = [];
            proceedCalc = true;
        }
        input.push(button.innerHTML);
        inputValues.textContent = input.join('');
        inputArray = input.join('');
    })
});

operations.forEach(button => {
    button.addEventListener('click', () => {
        proceedCalc = true;
        if(operation.length == 0) {
            operation = button.innerHTML;
            input.push(button.innerHTML);
            inputArray = input.join('');
            inputValues.textContent = input.join(''); 
        }
        else {
            if(operationArray.includes(input[input.length-1])) {
                if(input[input.length-1] != button.innerHTML) {
                    input.pop();
                    input.push(button.innerHTML);
                    operation = button.innerHTML;
                    inputArray = input.join('');
                    inputValues.textContent = input.join('');
                }
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

function evaluateInput() {
    rounding_decimal = 4;
    inputArray = inputArray.split(operation);
    resultValue = Math.round(operate(operation, inputArray[0], inputArray[1]) * 10**rounding_decimal)/10**rounding_decimal;
    result.textContent = resultValue;
    input = [];
    input.push(resultValue);
    operation = [];
    proceedCalc = false;
}

function operate(symbol, a, b) {
    if(symbol === '+') return sum(a, b);
    if(symbol === '-') return subtract(a, b);
    if(symbol === '*') return multiply(a, b);
    if(symbol === '/') return divide(a, b);
}

const test = document.querySelector('#test');
test.addEventListener('click', () => {
    console.log('input= ' + input);
    console.log('input[-1]= ' + input[input.length-1]);
    console.log('inputArray= ' + inputArray);
    console.log('operation= ' + operation);
    console.log('resultValue= ' + resultValue);
    console.log(' ');
});