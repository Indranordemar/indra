const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(index) {
    if (boardState[index] !== '' || !gameActive) return;

    boardState[index] = currentPlayer;
    renderBoard();
    checkResult();
}

function renderBoard() {
    board.innerHTML = '';
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        
        if (cell === 'X') {
            const img = document.createElement('img');
            img.src = 'hjärta-8161389'; // Länk till din X-bild
            img.alt = 'X';
            cellElement.appendChild(img);
        } else if (cell === 'O') {
            const img = document.createElement('img');
            img.src = 'star-shape-symbol-on-transparent-background-free-png'; // Länk till din O-bild
            img.alt = 'O';
            cellElement.appendChild(img);
        }

        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}


function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') continue;
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Spelare ${currentPlayer} vinner!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        message.textContent = 'Det blev oavgjort!';
        gameActive = false;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

restartButton.addEventListener('click', () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    renderBoard();
});

renderBoard();