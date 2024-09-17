import {
  createBoard,
  markTile,
  addToSumOfMinesLeft,
  revealTile,
} from "./minesweeperLogic.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 5;

const boardEl = document.querySelector(".board");
const numberOfMInesLeftEl = document.querySelector("[data-minesLeft]");

numberOfMInesLeftEl.textContent = NUMBER_OF_MINES;
boardEl.style.setProperty("--size", BOARD_SIZE);

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
board.forEach((row) =>
  row.forEach((tile) => {
    boardEl.appendChild(tile.tileElement);
    tile.tileElement.instance = tile;
  })
);
console.log(board);

document.body.addEventListener("click", (e) => {
  const tileEl = e.target.closest("[data-status]");
  if (!tileEl) return;

  revealTile(tileEl, board);
});

document.body.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  const tileEl = e.target.closest("[data-status]");
  if (!tileEl) return;

  console.log(tileEl);
  markTile(tileEl);
  updateMinesLeftNum(addToSumOfMinesLeft);
});

function updateMinesLeftNum(addToSum) {
  numberOfMInesLeftEl.textContent = +numberOfMInesLeftEl.textContent + addToSum;
}
