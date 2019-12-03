const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers div');
const operators = document.querySelectorAll('.operators div');
let operation = '';
let currentValue = 0;
let nextClear = false;

display.textContent = '0';

function typeNumber() {
    if (nextClear) {
        nextClear = !nextClear;
        display.textContent = '';
    }
    if (this.textContent.length < 14) {
        if (display.textContent == '0') {
            display.textContent = '';
        }
        display.textContent += this.textContent
    };
}

numbers.forEach(number => number.addEventListener('click', typeNumber));

operators.forEach(operator => operator.addEventListener('click', function () {
    if (operation) {
        currentValue = operation(currentValue, Number(display.textContent));
        display.textContent = currentValue;
    }
    nextClear = true;
    currentValue = Number(display.textContent);
    switch (this.classList[0]) {
        case 'add':
            operation = (a, b) => {
                return a + b;
            };
            break;
        case 'substract':
            operation = (a, b) => {
                return a - b;
            };
            break;
        case 'multiply':
            operation = (a, b) => {
                return a * b;
            };
            break;
        case 'divide':
            operation = (a, b) => {
                return a / b;
            };
            break;
        case 'equal':
            operation = '';
            break;
        case 'clear':
            operation = '';
            display.textContent = '0';
            currentValue = 0;
            break;
    }
}))