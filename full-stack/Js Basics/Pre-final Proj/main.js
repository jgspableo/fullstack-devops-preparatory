function compute()
{
    let principal = document.getElementById("principal").value;
    let rate = document.getElementById("rate").value;
    let years = document.getElementById("years").value;
    let interest = principal * years * rate / 100;
    let amount = parseFloat(principal) + parseFloat(interest);
    let result = document.getElementById("result");

    futureYear = new Date().getFullYear() + parseInt(years);

    if (principal <= 0) {
        alert("Enter a positive number");
        document.getElementById("principal").focus();
    } else {
        result.innerHTML = "If you deposit <mark>" + principal + "</mark>,<br/>" +
                           "at an interest rate of <mark>" + rate + "%</mark>.<br/>" +
                           "You will receive an amount of <mark>" + amount + "</mark>,<br/>" +
                           "in the year <mark>" + futureYear + "</mark><br/>";
    }
}

function updateRate() {
    var rateval = document.getElementById("rate").value;
    document.getElementById("rate_val").innerText = rateval;
}