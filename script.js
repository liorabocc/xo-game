const cells = document.querySelectorAll(".cell");
let board = Array(9).fill(null);
let isPlayerTurn = true;
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");

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

function handleGameEnd(winner) {
    modalMessage.textContent = winner === "Tie" ? "It's a tie!" : `${winner} wins!`;
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.display = "none";
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
        setTimeout(() => {
            computerMove();
        }, 500);
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