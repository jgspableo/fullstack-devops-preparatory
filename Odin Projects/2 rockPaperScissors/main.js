function getComputerChoice () {
    //define a number equivalent between 0 and 1 using math.random function
    let numberEquivalent = Math.random();

    //return rock if the number equivalent is < 1/3
    return numberEquivalent < 1/3 ? "rock" :

    //return paper if the number equivalent is between 1/3 and 2/3
    numberEquivalent < 2/3 ? "paper" :
    
    //return scissors if the number equivalent is not rocks or paper
    "scissors";
}

function checkRoundWinner (humanChoice, computerChoice) {
    //define winner variable either tie, player, or computer
    let winner = null;

    //compare the choices using ? operator
    humanChoice == "rock" && computerChoice == "scissors" ? winner = "human" :
    humanChoice == "scissors" && computerChoice == "paper" ? winner = "human" :
    humanChoice == "paper" && computerChoice == "rock" ? winner = "human" :
    computerChoice == "rock" && humanChoice == "scissors" ? winner = "computer" :
    computerChoice == "scissors" && humanChoice == "paper" ? winner = "computer" :
    computerChoice == "paper" && humanChoice == "rock" ? winner = "computer": 
    winner = "tie";

    //update score
    winner == "human" ? humanScore++ :
    winner == "computer" ? computerScore++ :
    null;

    //log the winner
    return winner;
}

function checkGameEnd() { return (humanScore >= 5 || computerScore >= 5); } 

const newGameBtn = document.getElementById("newGmBtn");
const resetBtn = document.getElementById("resetBtn");
const headerBtns = document.querySelector(".right");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const roundCont = document.getElementById("roundInfo");
let roundNum = document.getElementById("roundNum");
let roundTxt = document.getElementById("roundTxt");
let humanChoiceTxt = document.getElementById("humanChoice");
const choicesMenu = document.querySelector(".choices");
let compChoiceTxt = document.getElementById("compChoice");
let histList = document.getElementById("histList");
let humanScoreNum = document.getElementById("humanScore");
let compScoreNum = document.getElementById("compScore");

let humanScore = 0;
let computerScore = 0; 
let roundNumber = 0;
let humanChoice, computerChoice, winner;

function handleNewgameReset() {
    humanScore = 0; computerScore = 0; roundNumber = 0;

    roundNum.textContent = 0; 
    humanScoreNum.textContent = humanScore;
    compScoreNum.textContent = computerScore;
    humanChoiceTxt.textContent = "-"; compChoiceTxt.textContent = "-";
    roundTxt.textContent = "Game on. Choose your move!";

    rockBtn.disabled = false; paperBtn.disabled = false; scissorsBtn.disabled = false;
    resetBtn.disabled = false;
    histList.innerHTML = "";
    roundCont.style.border = "";
}

function handleHumanChoiceClick(hChoice, cChoice, winner) {
    roundNumber++;
    roundNum.textContent = roundNumber;
    humanChoiceTxt.textContent = hChoice;
    compChoiceTxt.textContent = cChoice;
    humanScoreNum.textContent = humanScore;
    compScoreNum.textContent = computerScore;

    const verdict = winner === 'human' ? '✅ You': 
                    winner === 'computer' ? '❌ CPU' :
                    '⏸️ Tie';
    const li = document.createElement('li');            
    li.textContent = `R${roundNumber}: You ${hChoice} vs CPU ${computerChoice} → ${verdict}`;
    histList.prepend(li);

    if (winner == "human" || winner == "computer") {
        const round = winner === 'human' ? 'You': 'Computer';
        roundTxt.textContent = `${round} win this round!`;
    } else { roundTxt.textContent = "It's a tie!"; }
    

    roundCont.style.border = "";

    if (winner === "computer") { roundCont.style.border = "solid 1px rgba(239,68,68,.35)"; } 
    else if (winner === "human") { roundCont.style.border = "solid 1px rgba(34,197,94,.35)"; } 
    else { roundCont.style.border = "solid 1px rgba(234,179,8,.35)" }; 

    handleGameEnd();
}

function handleGameEnd() {
    if (checkGameEnd()) {
        if (humanScore == 5) roundTxt.textContent = `🎉 You won the game!`;
        if (computerScore == 5) roundTxt.textContent = `🤖 Computer won the game!`;
        rockBtn.disabled = true; paperBtn.disabled = true; scissorsBtn.disabled = true;
        resetBtn.disabled = true;
    }
}

choicesMenu.addEventListener("click", (event) => {
    let target = event.target;

    switch(target.id) {
        case "rockBtn":
            humanChoice = "rock";
            computerChoice = getComputerChoice();
            winner = checkRoundWinner(humanChoice, computerChoice);
            handleHumanChoiceClick(humanChoice, computerChoice, winner);
            // console.log(humanChoice, computerChoice, winner, humanScore, computerScore);
            break;
            
        case "paperBtn":
            humanChoice = "paper";
            computerChoice = getComputerChoice();
            winner = checkRoundWinner(humanChoice, computerChoice);
            handleHumanChoiceClick(humanChoice, computerChoice, winner);
            // console.log(humanChoice, computerChoice, winner, humanScore, computerScore);
            break;
            
        case "scissorsBtn":
            humanChoice = "scissors";
            computerChoice = getComputerChoice();
            winner = checkRoundWinner(humanChoice, computerChoice);
            handleHumanChoiceClick(humanChoice, computerChoice, winner);
            // console.log(humanChoice, computerChoice, winner, humanScore, computerScore);
            break;
    }
})

headerBtns.addEventListener("click", (event) => {
    let target = event.target;

    switch(target.id) {
        default:
            handleNewgameReset();
    }
})

window.addEventListener('keydown', (e)=>{
    const k = e.key.toLowerCase();
    if (k==='r') document.querySelector('#rockBtn').click();
    if (k==='p') document.querySelector('#paperBtn').click();
    if (k==='s') document.querySelector('#scissorsBtn').click();
});

