const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const highScoreBoard = document.querySelector('.highScore');
const moles = document.querySelectorAll('.mole');
const slapFX = document.querySelector('.slapFX');
slapFX.preload = 'auto';
slapFX.load();
const highScoreFX = document.querySelector('.highScoreFX')
let lastHole;
let timeUp = false;
let score = 0;
let highScore = 0;
let difficulty;
const easy = document.querySelector('.easy');
const medium = document.querySelector('.medium');
const hard = document.querySelector('.hard');

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
    easy.style.color = 'white';
    medium.style.color = '';
    hard.style.color = '';
}

function mediumMode() {
    difficulty = "medium";
    medium.style.color = 'white';
    easy.style.color = '';
    hard.style.color = '';
}

function hardMode() {
    difficulty = "hard";
    hard.style.color = 'white';
    easy.style.color = '';
    medium.style.color = '';
}

function peep() {
    if (difficulty === "easy") {
        time = randTime(800, 1300);
    } else if (difficulty === "medium") {
        time = randTime(500, 1100);
    } else if (difficulty === "hard") {
        time = randTime(200, 600);
    } else {
        difficulty === "medium";
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
    const slap2FX = slapFX.cloneNode();
    slap2FX.play();
    slap2FX.volume = '.4';
    this.classList.remove('up');
    if (score > highScore) {
        // Work in Progess
        highScore = score;
        highScoreFX.play();
        highScoreFX.volume = '.5';

    }
    scoreBoard.textContent = score;
    highScoreBoard.textContent = highScore;
}

moles.forEach(mole => mole.addEventListener('click', bonk));