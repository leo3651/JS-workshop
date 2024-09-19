import {
  createBoard,
  markTile,
  addToSumOfMinesLeft,
  revealTile,
  checkLose,
  checkWin,
  TILE_STATUSES,
} from "./minesweeperLogic.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const boardEl = document.querySelector(".board");
const numberOfMInesLeftEl = document.querySelector("[data-minesLeft]");
const textMessage = document.querySelector(".subtext");

numberOfMInesLeftEl.textContent = NUMBER_OF_MINES;
boardEl.style.setProperty("--size", BOARD_SIZE);

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
board.forEach((row) =>
  row.forEach((tile) => {
    boardEl.appendChild(tile.tileElement);
    tile.tileElement.instance = tile;
  })
);

const rightClick = (e) => {
  e.preventDefault();
  const tileEl = e.target.closest("[data-status]");
  if (!tileEl) return;

  markTile(tileEl);
  updateMinesLeftNum(addToSumOfMinesLeft);
};

const leftClick = (e) => {
  const tileEl = e.target.closest("[data-status]");
  if (!tileEl) return;

  revealTile(tileEl, board);
  checkEndGame();
};

document.body.addEventListener("click", leftClick);
document.body.addEventListener("contextmenu", rightClick);

function updateMinesLeftNum(addToSum) {
  numberOfMInesLeftEl.textContent = +numberOfMInesLeftEl.textContent + addToSum;
}

function checkEndGame() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (lose || win) {
    document.body.removeEventListener("click", leftClick);
    document.body.removeEventListener("contextmenu", rightClick);
  }

  if (lose) {
    board.forEach((row) =>
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) {
          markTile(tile.tileElement);
        }
        revealTile(tile.tileElement, board);
      })
    );
    textMessage.textContent = "You lost!";
  }

  if (win) {
    textMessage.textContent = "You win!";
  }
}
