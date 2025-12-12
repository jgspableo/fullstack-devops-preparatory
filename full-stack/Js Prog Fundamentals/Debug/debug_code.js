function performOperation() {
    let num1 = parseInt(document.getElementById("input1").value);
    let num2 = parseInt(document.getElementById("input2").value);
    
    if (!isNaN(num1) && !isNaN(num2)) {
        let result = multiply(num1, num2);
        displayResult(result);
    } else {
        displayResult("please enter valid numbers");
    }

    function multiply(a, b) {
        debugger;
        return a * b;
    }

    function displayResult(res) {
        const resultElement = document.getElementById("result");
        resultElement.textContent = `The result is: ${res}`;
    }
}