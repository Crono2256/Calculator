const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers div');
const operators = document.querySelectorAll('.operators div');
let operation = '';
let firstArg = '';
let secondArg = '';
// let nextClear = false;
// let firstOperation = true;

display.textContent = '0';

function typeNumber() {
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

    // INPUT
    if (operation) secondArg += this.textContent;
    else if (typeof (firstArg) === 'number') {
        firstArg = this.textContent;
        console.log('funkcja warunkowa');
    } else firstArg += this.textContent;


    console.log(firstArg, secondArg, operation);
}

numbers.forEach(number => number.addEventListener('click', typeNumber));

operators.forEach(operator => operator.addEventListener('click', function () {
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

    // execute operation, if set

    if (operation && secondArg) {
        firstArg = operation(Number(firstArg), Number(secondArg));
        secondArg = '';
    }

    // Set next operation
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
}))