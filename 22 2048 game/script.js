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
  return slideTiles(grid.cellsByColumn);
}

function moveDown() {}
function moveRight() {}
function moveLeft() {}

function slideTiles(cells) {
  console.log(cells);
  cells.forEach((group) => {
    for (let i = 1; i < group.length; i++) {
      const cell = group[i];
      let lastValidCell = null;
      if (cell.tile !== null) {
        for (let j = i - 1; j >= 0; j--) {
          const cellAbove = group[j];
          if (!cellAbove.canAccept(cell.tile)) break;
          lastValidCell = cellAbove;
        }

        if (lastValidCell != null) {
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
    }
  });
}
