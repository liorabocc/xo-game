const cells = document.querySelectorAll(".cell");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const playerWins = document.getElementById("playerWins");
const computerWins = document.getElementById("computerWins");
const ties = document.getElementById("ties");

let board = Array(9).fill(null);
let isPlayerTurn = true;

let gameResults = JSON.parse(localStorage.getItem("GameResults")) || {
    playerWins: 0,
    computerWins: 0,
    ties: 0,
};

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner(board) {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : "Tie";
};

function makeMove(index, mark) {
    board[index] = mark;
    cells[index].textContent = mark;
};

function resetBoard() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = "");
};

function updateResults(winner) {
    if (winner === "X") {
        gameResults.playerWins++;
    } else if (winner === "O") {
        gameResults.computerWins++;
    } else if (winner === "Tie") {
        gameResults.ties++;
    }
    localStorage.setItem("GameResults", JSON.stringify(gameResults));
    renderResults();
};

function renderResults() {
    playerWins.textContent = gameResults.playerWins > 0 ? gameResults.playerWins : "";
    computerWins.textContent = gameResults.computerWins > 0 ? gameResults.computerWins : "";
    ties.textContent = gameResults.ties > 0 ? gameResults.ties : "";
};

function handleGameEnd(winner) {
    modalMessage.textContent = winner === "Tie" ? "It's a tie!" : `${winner} wins!`;
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.display = "none";
        updateResults(winner);
        resetBoard();
    }, 2000);
};

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index]) return;  // Cell already occupied
    makeMove(index, "X");
    const winner = checkWinner(board);
    if (winner) {
        setTimeout(() => {
            handleGameEnd(winner);
        }, 500);
    } else {
        isPlayerTurn = false;
        setTimeout(computerMove(), 500);
    }
};

function computerMove() {
    const emptyCells = board.map((value, index) => value === null ? index : null).filter(value => value !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, "O");
    const winner = checkWinner(board);
    if (winner) {
        setTimeout(() => {
            handleGameEnd(winner);
        }, 500);
    } else {
        isPlayerTurn = true;
    }
};

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

renderResults();