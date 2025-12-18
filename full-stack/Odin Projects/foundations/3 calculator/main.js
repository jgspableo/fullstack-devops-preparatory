const allBtns = Array.from(document.querySelectorAll("button"));
const numberDisplay = document.getElementById("numberDisplay");

let currentNumber = "0";
numberDisplay.textContent = currentNumber;

function updateNumber(num) {
    if (num == "." && calc.isFloat == true) {
        return;
    } else {
        currentNumber == "0" ? currentNumber = num : currentNumber += num;
        numberDisplay.textContent = currentNumber;
        if (num == ".") calc.isFloat = true;
        console.log(currentNumber);
    }
}

function updateOperation(op) {
    if (!calc.operation) {
        calc.operation = op;
        calc.previousNumber = parseFloat(currentNumber);
        currentNumber = "0";
        calc.isFloat = false;
    } else {
        getResult();
        currentNumber = "0";
        calc.operation = op;
    }
}

function performOperation(a, b, op) {
    switch(op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
    }
}

function getResult() {

    console.log(calc);

    if (calc.previousNumber) calc.factorOf = parseFloat(currentNumber);

    if (!calc.previousNumber && !calc.factorOf) { return; }
    else if (!calc.result) { calc.result = performOperation(calc.previousNumber,
                                                    calc.factorOf,
                                                    calc.operation); }
    else { calc.result = performOperation(calc.result,
                                                calc.factorOf,
                                                calc.operation) }

    currentNumber = calc.result;
    if (!Number.isInteger(currentNumber)) currentNumber = currentNumber.toFixed(3);
    numberDisplay.textContent = currentNumber;
    isFloat = false;
}

function clear() {
    currentNumber = "0";
    numberDisplay.textContent = currentNumber;
    calc.previousNumber = 0;
    calc.factorOf = 0;
    calc.result = 0;
    calc.isFloat = false;
    calc.operation = 0;
}

function backspace() {
    (currentNumber == "0" || currentNumber.length == 1)
    ? currentNumber = "0"
    : currentNumber = currentNumber.slice(0, -1);
    numberDisplay.textContent = currentNumber;
}

const calc = {
    previousNumber: 0,
    factorOf: 0,
    result: 0,
    operation: 0,
    isFloat: false
}

allBtns.forEach(button => {
    button.addEventListener("mouseover", (event) => {
        let target = event.target;
        target.style.transform  = "scale(1.3)";
    })

    button.addEventListener("mouseout", (event) => {
        let target = event.target;
        target.style.transform = "";
    })

    button.addEventListener("click", (event) => {
        let target = event.target;
        target.style.transform = "scale(.98)";

        switch(target.id) {
            case "zeroBtn": updateNumber("0"); break;
            case "oneBtn": updateNumber("1"); break;
            case "twoBtn": updateNumber("2"); break;
            case "threeBtn": updateNumber("3"); break;
            case "fourBtn": updateNumber("4"); break;
            case "fiveBtn": updateNumber("5"); break;
            case "sixBtn": updateNumber("6"); break;
            case "sevenBtn": updateNumber("7"); break;
            case "eightBtn": updateNumber("8"); break;
            case "nineBtn": updateNumber("9"); break;
            case "clearBtn": clear(); break;
            case "bspaceBtn": backspace(); break;
            case "addBtn": updateOperation("+"); break;
            case "subBtn": updateOperation("-"); break;
            case "mulBtn": updateOperation("*"); break;
            case "divBtn": updateOperation("/"); break;
            case "dotBtn": updateNumber("."); break;
            case "equalBtn": getResult(); break;
        }
    })
})