const cells = document.querySelectorAll(".cell");
let board = Array(9).fill(null);
let isPlayerTurn = true;

function makeMove(index, mark) {
    board[index] = mark;
    cells[index].textContent = mark;
};

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index]) return;  // Cell already occupied
    makeMove(index, "X");
    isPlayerTurn = false;
    setTimeout(computerMove, 500);
};

function computerMove() {
    const emptyCells = board.map((value, index) => value === null ? index : null).filter(value => value !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, "O");
    isPlayerTurn = true;
};

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});