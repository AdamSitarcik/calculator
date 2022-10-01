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


function highlightBtn(button) {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
    });
    button.addEventListener('transitionend', () => {
        button.classList.remove('clicked');
    });
}


clear.addEventListener('click', () => {
    input = [];
    inputArray = [];
    operation = [];
    inputValues.textContent = '';
    result.textContent = '';
});

document.addEventListener('keydown', (event) =>{
    document.querySelector(`[data-key="${event.key}"]`).click();
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
})

negative.addEventListener('click', () => {
    if(operation == 0) {
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

function evaluateInput() {
    rounding_decimal = 4;
    if(operation != 0) {
        inputArray = inputArray.split(operation);
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

function operate(symbol='', a, b) {
    if(symbol === moduloBtn.dataset.symbol) return modulo(a, b);
    if(symbol === addBtn.dataset.symbol) return sum(a, b);
    if(symbol === subtractBtn.dataset.symbol) return subtract(a, b);
    if(symbol === multiplyBtn.dataset.symbol) return multiply(a, b);
    if(symbol === divideBtn.dataset.symbol) return divide(a, b);
    if(symbol === powerBtn.dataset.symbol) return power(a, b);
    if(symbol === factorialBtn.dataset.symbol) return factorial(a, b);
}

const test = document.querySelector('#test');
test.addEventListener('click', () => {
   console.log('input=' + input); 
   console.log('inputArray= ' + inputArray); 
   console.log('operation= ' + operation); 
   console.log(''); 
});