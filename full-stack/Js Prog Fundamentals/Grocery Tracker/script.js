function sumUp() {
    let total = 0;
    const amounts = document.getElementsByTagName("input");
    for (let i = 0; i < amounts.length; i++) {
        total += Number(amounts[i].value);
    }
    document.getElementById("total").innerText = "The total amount is: $" + total.toFixed(2);
}