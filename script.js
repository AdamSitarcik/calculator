let input = [];
let inputDisplay = [];
let firstValue;
let secondValue;
let operation = [];
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
        input.push(button.innerHTML);
        inputValues.textContent = input.join('');
    })
});

operations.forEach(button => {
    button.addEventListener('click', () => {
        operation = button.innerHTML;
        input.push(button.innerHTML);
        firstValue = input.join('')[0]
        inputValues.textContent = input.join('');
    })
})

equal.addEventListener('click', evaluateInput);

function sum(a, b) {
    return a + b;
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
    firstValue = input.join('').split(operation);
    result.textContent = operate(operation, firstValue[0], firstValue[1]);
    input = [];
    operation = [];
}

function operate(symbol, a, b) {
    if(symbol === '+') return sum(a, b);
    if(symbol === '-') return subtract(a, b);
    if(symbol === '*') return multiply(a, b);
    if(symbol === '/') return divide(a, b);
}