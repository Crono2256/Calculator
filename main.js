const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers div');

function typeNumber() {
    display.textContent += this.textContent;
}

numbers.forEach(number => number.addEventListener('click', typeNumber));