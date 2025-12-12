
let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

function startTest() {
    document.getElementById("inputText").value = testText;

    let userInput = document.getElementById("userInput");
    userInput.value = "";
    userInput.readOnly = false;
    userInput.focus();

    document.getElementById("output").innerHTML = "";
    
    startTime = new Date().getTime();
}

function endTest() {
    endTime = new Date().getTime();

    document.getElementById("userInput").readOnly = true;

    let timeElapsed = (endTime - startTime) / 1000; // in seconds
    let userInput = document.getElementById("userInput").value;

    let wordsTyped = userInput.split(/\s+/).filter(word => word !== "").length;

    let wpm = 0;

    if (timeElapsed !== 0 && !isNaN(wordsTyped)) {
        wpm = Math.round((wordsTyped / timeElapsed) * 60);
    } 

    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Typing Test Results</h2>" +
        "<p>Total Length: " + userInput.length + " characters</p>" +
        "<p>Words Typed: " + wordsTyped + "</p>" +
        "<p>Time Elapsed: " + timeElapsed.toFixed(2) + " seconds</p>" +
        "<p>Words Per Minute (WPM): " + wpm + "</p>";

    document.getElementById("inputText").value = "";
}