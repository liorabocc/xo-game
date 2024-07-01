const cells = document.querySelectorAll(".cell");
let board = Array(9).fill(null);

function makeMove(index, mark) {
    board[index] = mark;
    cells[index].textContent = mark;
};

function handleClick(event) {
    const index = event.target.dataset.index;
    makeMove(index, "X");
};

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});