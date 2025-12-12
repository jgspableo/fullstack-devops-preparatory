const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'red', 'blue', 'green', 'purple', 'orange', 'pink'];
let cards = shuffle(colors.concat(colors));
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;

const startbtn = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

function generateCards() {
    for (const color of cards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = "?";
        gameContainer.appendChild(card);
    }
}

function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

function handleCardClick(event) {
    const card = event.target;
    if (!card.classList.contains("card") || card.classList.contains("matched")) {
        return;
    }
    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;
    selectedCards.push(card);
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (selectedCards[0].dataset.color === selectedCards[1].dataset.color) {
        selectedCards[0].classList.add("matched");
        selectedCards[1].classList.add("matched");
        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        selectedCards[0].textContent = "?";
        selectedCards[1].textContent = "?";
        selectedCards[0].style.backgroundColor = "#ddd";
        selectedCards[1].style.backgroundColor = "#ddd";
    }
    selectedCards = [];
}

function startGame() {
    timeLeft = 30;
    score = 0;
    startbtn.disabled = true;
    selectedCards = []; 
    cards = shuffle(colors.concat(colors))
    scoreElement.textContent = `Score: ${score}`;
    gameContainer.innerHTML = "";
    generateCards();
    gameContainer.addEventListener("click", handleCardClick);
    startGameTimer(timeLeft);
}

function startGameTimer(timeLeft) {
    timerElement.textContent = `Time: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(gameInterval);
            let timeLeft = 30;
            alert("Game Over!")
            startbtn.disabled = false;
        }        
    }, 1000);
}

startbtn.addEventListener('click', startGame);