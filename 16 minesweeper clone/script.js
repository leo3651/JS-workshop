import { createBoard } from "./minesweeperLogic.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;
const boardEl = document.querySelector(".board");

boardEl.style.setProperty("--size", BOARD_SIZE);
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
board.forEach((row) =>
  row.forEach((tile) => boardEl.appendChild(tile.tileElement))
);

console.log(board);
