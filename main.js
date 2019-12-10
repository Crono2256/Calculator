const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers div');
const operators = document.querySelectorAll('.operators div');
let operation = '';
let firstArg = '';
let secondArg = '';

display.textContent = '0';

// OUTPUT FUNCTION

function output() {
    let firstArgCut = '0';
    let secondArgCut = '0'

    // remove multiple zeros on beginning
    for (let i = 0; i < firstArg.toString().length; i++) {
        if (firstArg.toString()[i] === '.') {
            if (i == 0) {
                firstArgCut = '0' + firstArg.toString();
            } else
                firstArgCut = firstArg.toString().slice(i - 1);
            i = firstArg.toString().length;
        } else if (firstArg.toString()[i] !== '0') {
            firstArgCut = firstArg.toString().slice(i);
            i = firstArg.toString().length;
        }
    }

    for (let i = 0; i < secondArg.length; i++) {
        if (secondArg[i] === '.') {
            if (i == 0) {
                secondArgCut = '0' + secondArg.toString();
            } else
                secondArgCut = secondArg.slice(i - 1);
            i = secondArg.length;
        } else if (secondArg[i] !== '0') {
            secondArgCut = secondArg.slice(i);
            i = secondArg.length;
        }
    }

    console.log(firstArgCut, secondArgCut);

    // check if char limit is reached and display number with notation or not
    if (secondArg) {
        if ((Number(secondArgCut)).toString() !== Number(secondArgCut) && secondArgCut.toString().length < 13) {
            display.textContent = secondArgCut;
        } else if (secondArg === '.') display.textContent = '0';
        else {
            display.textContent = Number(secondArg).toExponential(8);
        }
    } else if ((Number(firstArgCut)).toString() !== Number(firstArgCut) && firstArgCut.toString().length < 13) {
        display.textContent = firstArgCut;
    } else if (firstArg === '.') display.textContent = '0';
    else {
        display.textContent = Number(firstArg).toExponential(8);
    }

    // console.log(firstArgCut.toString().length < 13)

}

// INPUT FUNCTION
function typeNumber(e) {

    // don't enter the function if other key than number is pressed
    if (!(e.keyCode === 48 || e.keyCode === 49 || e.keyCode === 50 || e.keyCode === 51 || e.keyCode === 52 || e.keyCode === 53 || e.keyCode === 54 || e.keyCode === 55 || e.keyCode === 56 || e.keyCode === 57 || e.keyCode === 44 || e.keyCode === 46) && this.textContent === undefined) return;

    // check if event is caused by mouse click or key press
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

    if (operation && (number !== '.' || !secondArg.includes('.'))) secondArg += number;
    else if (typeof (firstArg) === 'number') {
        firstArg = number;
    } else if ((number !== '.' || !firstArg.includes('.')) && !secondArg.includes('.')) firstArg += number;

    console.log(firstArg, secondArg, operation);

    output();
}

// OPERATION FUNCTION
function doOperation(e) {

    // don't enter the function if other key than operator is pressed
    if (!(e.keyCode === 43 || e.keyCode === 45 || e.keyCode === 42 || e.keyCode === 47 || e.keyCode === 13 || e.keyCode === 61 || e.keyCode === 99 || e.keyCode === 67) && this.textContent === undefined) return;

    // convert single dot to 0

    if (firstArg === '.') firstArg = '0';
    else if (secondArg === '.') secondArg = '0';

    let operator;

    // execute operation, if set

    if (operation && secondArg) {
        firstArg = operation(Number(firstArg), Number(secondArg));
        secondArg = '';
    }

    // check if event is caused by mouse click or key press
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
    // console.log(firstArg, secondArg, operation)

    output();
}

// MOUSE AND KEYBOARD INPUT EVENTS
numbers.forEach(number => number.addEventListener('click', typeNumber));

window.addEventListener('keypress', typeNumber);

// OPERATOR EVENTS
operators.forEach(operator => operator.addEventListener('click', doOperation))

window.addEventListener('keypress', doOperation);