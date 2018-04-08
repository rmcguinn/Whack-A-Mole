const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const highScoreBoard = document.querySelector('.highScore');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let highScore = 0;
let difficulty;
// let minTime = 0;
// let maxTime = 0;

function randTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole) {
        return randHole(holes);
    }
    
    lastHole = hole;
    return hole;
}

// Game Difficulty

function easyMode() {
    difficulty = "easy";
    console.log('easy');
}

function mediumMode() {
    difficulty = "medium";
    console.log('medium');
}

function hardMode() {
    difficulty = "hard";
    console.log('hard');
}

function peep() {
    if (difficulty === "easy") {
        time = randTime(800, 1300);
    } else if (difficulty === "medium") {
        time = randTime(500, 1100);
    } else if (difficulty === "hard") {
        time = randTime(200, 600);
    } else {
        time = randTime(500, 1100);
    }
    const hole = randHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}


function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
        timeUp = true;
    }, 15000)
}

function bonk(e) {
    if(!e.isTrusted) return; // Cheat Detection
    score++;
    this.classList.remove('up');
    if (score > highScore) {
        highScore = score;
    }
    scoreBoard.textContent = score;
    highScoreBoard.textContent = highScore;
}

moles.forEach(mole => mole.addEventListener('click', bonk));