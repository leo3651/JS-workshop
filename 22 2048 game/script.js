import { Grid } from "./Grid.js";
import { Tile } from "./Tile.js";

const gameBoardEl = document.querySelector(".game-board");

const grid = new Grid(gameBoardEl);

console.log(grid);

grid.randomEmptyCell.tile = new Tile(gameBoardEl);
grid.randomEmptyCell.tile = new Tile(gameBoardEl);

setupInput();

function setupInput() {
  document.addEventListener("keydown", handleInput, { once: true });
}

function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
      moveUp();
      break;

    case "ArrowDown":
      moveDown();
      break;

    case "ArrowRight":
      moveRight();
      break;

    case "ArrowLeft":
      moveLeft();
      break;

    default:
      setupInput();
      break;
  }

  setupInput();
}

function moveUp() {
  console.log(grid.cellsByColumn);
  console.log(grid.cellsByRow);
  slideTiles(grid.cellsByColumn);
}

function moveDown() {}
function moveRight() {}
function moveLeft() {}

function slideTiles() {}
