const players = ["X", "O"];
let scores = [0, 0];

const cells = Array.from(document.querySelectorAll(".cell"));

let currentPlayer = players[0];

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick, { once: true });
});

function handleCellClick(event) {
  const cell = event.target;
  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    scores[players.indexOf(currentPlayer)]++;
    updateScoreBoard();
    endGame(`${currentPlayer} wins!`);
  } else if (checkDraw()) {
    endGame("Draw!");
  } else {
    switchPlayer();
  }
}

function checkWin(player) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombos.some(combo => {
    return combo.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function checkDraw() {
  return cells.every(cell => {
    return cell.textContent !== "";
  });
}

function switchPlayer() {
  currentPlayer = players[players.indexOf(currentPlayer) ^ 1];
}

function endGame(message) {
  alert(message);
  cells.forEach(cell => {
    cell.textContent = "";
  });
  currentPlayer = players[0];
  cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick, { once: true });
  });
}

function updateScoreBoard() {
  const scoreBoard = document.querySelector("#score-board");
  const scoreElements = scoreBoard.querySelectorAll(".score");
  scoreElements.forEach((element, index) => {
    element.textContent = `${players[index]}: ${scores[index]}`;
  });
}
