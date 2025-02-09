const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#008000', '#FFC0CB', '#A52A2A', '#808080'
];

let currentColor;
let score = 0;

const colorBox = document.querySelector('[data-testid="colorBox"]');
const optionsContainer = document.querySelector('.options-container');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

function getRandomColors(count) {
    const shuffled = [...colors].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function showStatus(message, isCorrect) {
    gameStatus.textContent = message;
    gameStatus.className = 'game-status show ' + (isCorrect ? 'correct' : 'wrong');
}

function handleGuess(color) {
    if (color === currentColor) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        showStatus('Correct!', true);
        setTimeout(startNewGame, 1000);
    } else {
        showStatus('Wrong guess, try again!', false);
    }
}

function startNewGame() {
    const gameColors = getRandomColors(6);
    currentColor = gameColors[Math.floor(Math.random() * gameColors.length)];
    colorBox.style.backgroundColor = currentColor;
    
    optionsContainer.innerHTML = '';
    gameColors.forEach(color => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'colorOption');
        button.className = 'color-option';
        button.style.backgroundColor = color;
        button.onclick = () => handleGuess(color);
        optionsContainer.appendChild(button);
    });

    gameStatus.className = 'game-status';
}

newGameButton.addEventListener('click', startNewGame);
startNewGame();