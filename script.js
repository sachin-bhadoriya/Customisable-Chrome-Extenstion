function showAlert() {
    window.alert("Hello Sachin! Good Morning! 🌞");
}

function showCustomAlert() {
    window.alert("Hello! Good Morning to you too! Have a great day ahead! 🌞");
}

function showTime() {
    const time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let am_pm = "AM";

    if (hour >= 12) {
        if (hour > 12) hour -= 12;
        am_pm = "PM";
    } else if (hour === 0) {
        hour = 12;
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    const currentTime = `${hour}:${min}:${sec} ${am_pm}`;
    document.getElementById("clock").textContent = currentTime;
}

setInterval(showTime, 1000);
showTime(); // initial call

// Todo List code as before
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-todo');
    const list = document.getElementById('todo-list');

    // Load saved todos
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoItem(todo));

    addBtn.addEventListener('click', () => {
        if (input.value.trim() !== "") {
            addTodoItem(input.value);
            todos.push(input.value);
            localStorage.setItem('todos', JSON.stringify(todos));
            input.value = "";
        }
    });

    function addTodoItem(text) {
        const li = document.createElement('li');
        li.textContent = text;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'X';
        removeBtn.addEventListener('click', () => {
            li.remove();
            todos = todos.filter(todo => todo !== text);
            localStorage.setItem('todos', JSON.stringify(todos));
        });
        li.appendChild(removeBtn);
        list.appendChild(li);
    }

    // Calculator code
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.calculator .buttons button');

    let currentInput = '0';
    let operator = null;
    let firstOperand = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function resetCalculator() {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }

    function calculate(first, second, op) {
        const a = parseFloat(first);
        const b = parseFloat(second);
        if (op === '+') return a + b;
        if (op === '-') return a - b;
        if (op === '×') return a * b;
        if (op === '÷') {
            if (b === 0) {
                alert("Cannot divide by zero");
                return first;
            }
            return a / b;
        }
        if (op === '%') return a % b;
        return second;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const btnText = button.textContent;

            if (button.classList.contains('btn-ac')) {
                resetCalculator();
                return;
            }

            if (button.classList.contains('btn-operator')) {
                if (btnText === '±') {
                    if (currentInput !== '0') {
                        currentInput = (parseFloat(currentInput) * -1).toString();
                        updateDisplay();
                    }
                    return;
                }
                if (btnText === '%') {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    updateDisplay();
                    return;
                }

                if (operator && waitingForSecondOperand) {
                    operator = btnText; // Change operator if operator pressed again before second operand
                    return;
                }

                if (firstOperand === null) {
                    firstOperand = currentInput;
                } else if (operator) {
                    const result = calculate(firstOperand, currentInput, operator);
                    currentInput = String(result);
                    firstOperand = currentInput;
                    updateDisplay();
                }

                operator = btnText === '=' ? null : btnText;
                waitingForSecondOperand = true;
                return;
            }

            // Digit or decimal point
            if (btnText === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
                updateDisplay();
                return;
            }

            // If waiting for second operand, reset input
            if (waitingForSecondOperand) {
                currentInput = btnText;
                waitingForSecondOperand = false;
            } else {
                if (currentInput === '0') {
                    currentInput = btnText;
                } else {
                    currentInput += btnText;
                }
            }

            updateDisplay();
        });
    });

    updateDisplay();
});
