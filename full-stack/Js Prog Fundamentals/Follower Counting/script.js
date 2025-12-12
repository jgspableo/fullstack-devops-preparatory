let count = 0;

function increaseCount() {
    function updateDisplay(count) {
        document.getElementById("countDisplay").innerText = count;
    }
    count += 1;
    updateDisplay(count);
    checkFollowerCount();
}

function checkFollowerCount() {
    if (count === 10) {
        alert("You have reached 10 followers!");
    } else if (count === 20) {
        alert("You have reached 20 followers!");
    } else if (count === 30) {
        alert("You have reached 30 followers!");
    }
}

function resetCount() {
    count = 0;
    document.getElementById("countDisplay").innerText = count;
    alert("Follower count has been reset.");
}
