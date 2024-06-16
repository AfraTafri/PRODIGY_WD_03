const cells = document.querySelectorAll('.cell');
const winnerMessage = document.getElementById('winner-message');
const playerTurn = document.getElementById('player-turn');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
let currentPlayer = 'X';
let gameActive = true;
let score = { X: 0, O: 0 };

function cellClicked(index) {
    if (gameActive && !cells[index].textContent) {
        cells[index].textContent = currentPlayer;
        if (checkWin()) {
            winnerMessage.textContent = `Player ${currentPlayer} wins!`;
            score[currentPlayer]++;
            updateScoreboard();
            gameActive = false;
        } else if (checkDraw()) {
            winnerMessage.textContent = "It's a draw!";
            gameActive = false;
        } else {
            togglePlayer();
            updatePlayerTurn();
        }
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningConditions.some((condition) => {
        const [a, b, c] = condition;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    winnerMessage.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
    updatePlayerTurn();
}

function updatePlayerTurn() {
    playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
}

function updateScoreboard() {
    scoreX.textContent = score['X'];
    scoreO.textContent = score['O'];
}
