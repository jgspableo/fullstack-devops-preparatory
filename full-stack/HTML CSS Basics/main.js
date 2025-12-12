function test() {
    alert("test");
}

function convertTemp() {
    let celsius = document.getElementById("celsius").value;
    let fahrenheit = (celsius * 9/5) + 32;
    document.getElementById("fahrenheit").value = fahrenheit;
}

function convertWeight() {
    let kilograms = document.getElementById("kilograms").value;
    let pounds = kilograms * 2.205;
    document.getElementById("pounds").value = pounds;
}

function convertDistance() {
    let kilometers = document.getElementById("kilometers").value;
    let miles = kilometers * 0.6214;
    document.getElementById("miles").value = miles;
}
