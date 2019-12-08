const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers div');
const operators = document.querySelectorAll('.operators div');
let operation = '';
let firstArg = '';
let secondArg = '';
// let nextClear = false;
// let firstOperation = true;

display.textContent = '0';

// OUTPUT FUNCTION

function output() {
    if (firstArg.toString().length >= 13) {
        display.textContent = Number(firstArg).toExponential(8);
    } else display.textContent = Number(firstArg);
}

// INPUT FUNCTION
function typeNumber(e) {
    // if (nextClear) {
    //     nextClear = !nextClear;
    //     display.textContent = '';
    // }
    // if (display.textContent.length < 13) {
    //     if (display.textContent == '0') {
    //         display.textContent = '';
    //     }
    //     display.textContent += this.textContent
    // };
    // console.log(currentValue, operation, firstOperation, nextClear)

    // console.log(e.keyCode);

    // INPUT

    // don't enter the function if other key than number is pressed
    if (!(e.keyCode === 48 || e.keyCode === 49 || e.keyCode === 50 || e.keyCode === 51 || e.keyCode === 52 || e.keyCode === 53 || e.keyCode === 54 || e.keyCode === 55 || e.keyCode === 56 || e.keyCode === 57 || e.keyCode === 44 || e.keyCode === 46) && this.textContent === undefined) return;

    let number;
    if (this.textContent === undefined)
        switch (e.keyCode) {
            case 48:
                number = '0'
                break;
            case 49:
                number = '1'
                break;
            case 50:
                number = '2'
                break;
            case 51:
                number = '3'
                break;
            case 52:
                number = '4'
                break;
            case 53:
                number = '5'
                break;
            case 54:
                number = '6'
                break;
            case 55:
                number = '7'
                break;
            case 56:
                number = '8'
                break;
            case 57:
                number = '9'
                break;
            case 44:
                number = '.'
                break;
            case 46:
                number = '.'
                break;
        } else number = this.textContent;

    // console.log(number);

    if (operation && (number !== '.' || !secondArg.includes('.'))) secondArg += number;
    else if (typeof (firstArg) === 'number') {
        firstArg = number;
    } else if ((number !== '.' || !firstArg.includes('.')) && !secondArg.includes('.')) firstArg += number;

    console.log(firstArg, secondArg, operation);

    output();
}

// OPERATION FUNCTION
function doOperation(e) {
    // if (operation && !nextClear) {
    //     currentValue = operation(currentValue, Number(display.textContent));
    //     if (currentValue.toString().length <= 13) {
    //         display.textContent = currentValue.toString();
    //     } else {
    //         display.textContent = (currentValue.toString()).slice(0, 10) + 'A' + (currentValue.toString().length - 10).toString();
    //     }
    // }
    // nextClear = true;
    // if (firstOperation) {
    //     firstOperation = !firstOperation;
    //     currentValue = Number(display.textContent);
    // }

    // console.log(e.keyCode);

    // 43:+, 45:-, 42:*, 47:/, 13 or 61:=, 99 or 67:C

    // don't enter the function if other key than operator is pressed
    if (!(e.keyCode === 43 || e.keyCode === 45 || e.keyCode === 42 || e.keyCode === 47 || e.keyCode === 13 || e.keyCode === 61 || e.keyCode === 99 || e.keyCode === 67) && this.textContent === undefined) return;

    if (firstArg === '.') firstArg = '0';
    else if (secondArg === '.') secondArg = '0';

    let operator;

    // execute operation, if set

    if (operation && secondArg) {
        firstArg = operation(Number(firstArg), Number(secondArg));
        secondArg = '';
    }

    if (this.textContent === undefined) {
        switch (e.keyCode) {
            case 43:
                operator = 'add';
                break;
            case 45:
                operator = 'substract';
                break;
            case 42:
                operator = 'multiply';
                break;
            case 47:
                operator = 'divide';
                break;
            case 13:
                operator = 'equal';
                break;
            case 61:
                operator = 'equal';
                break;
            case 99:
                operator = 'clear';
                break;
            case 67:
                operator = 'clear';
                break;
        }
    } else operator = this.classList[0];


    // Set next operation
    switch (operator) {
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
            // firstOperation = true;
            break;
        case 'clear':
            operation = '';
            // display.textContent = '0';
            // currentValue = 0;
            // firstOperation = true;
            firstArg = '';
            secondArg = '';
            operation = ''
            break;
    }
    console.log(firstArg, secondArg, operation)

    output();
}

// MOUSE AND KEYBOARD INPUT EVENTS
numbers.forEach(number => number.addEventListener('click', typeNumber));

window.addEventListener('keypress', typeNumber);

// OPERATOR EVENTS
operators.forEach(operator => operator.addEventListener('click', doOperation))

window.addEventListener('keypress', doOperation);