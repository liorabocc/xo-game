# XO Game

This project is a simple XO game implemented using Vanilla JavaScript, HTML, and CSS. The game allows a human player (X) to compete against a computer player (O) with results tracked and displayed. The game history is stored in localStorage to persist across page refreshes, and a reset button allows the user to clear the history and start fresh.

## Features

- **Playable XO Game**: Standard 3x3 grid where the human player uses "X" and the computer uses "O".
- **Autonomous Computer Player**: The computer player makes random moves.
- **Game Results Tracking**: Results of each game are tracked and displayed as counts for player wins, computer wins, and ties.
- **Persistent History**: Game history is saved in localStorage to persist across page refreshes.
- **Reset Functionality**: Reset button to clear the game history and start a new game.

## How to Play

1. Open the index.html file in a web browser.
2. Click on any cell in the grid to place your "X".
3. The computer will automatically make its move.
4. The game will announce the winner or if it's a tie and reset the board after 5 seconds.
5. View the counts of player wins, computer wins, and ties in the results section.
6. Use the "Reset" button to clear the game history.