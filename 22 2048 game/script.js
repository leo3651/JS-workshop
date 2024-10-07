import { Grid } from "./Grid.js";
import { Tile } from "./Tile.js";

const gameBoardEl = document.querySelector(".game-board");

const grid = new Grid(gameBoardEl);

grid.randomEmptyCell.tile = new Tile(gameBoardEl);
grid.randomEmptyCell.tile = new Tile(gameBoardEl);

setupInput();

function setupInput() {
  document.addEventListener("keydown", handleInput, { once: true });
}

async function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setupInput();
        return;
      }
      await moveUp();
      break;

    case "ArrowDown":
      if (!canMoveDown()) {
        setupInput();
        return;
      }
      await moveDown();
      break;

    case "ArrowRight":
      if (!canMoveRight()) {
        setupInput();
        return;
      }
      await moveRight();
      break;

    case "ArrowLeft":
      if (!canMoveLeft()) {
        setupInput();
        return;
      }
      await moveLeft();
      break;

    default:
      setupInput();
      return;
  }

  grid.cells.forEach((cell) => cell.mergeTiles());
  const newTile = new Tile(gameBoardEl);
  grid.randomEmptyCell.tile = newTile;

  if (!canMoveDown() && !canMoveUp() && !canMoveRight() && !canMoveLeft()) {
    await newTile.waitForTransitionEnd("animationend");
    alert("YOU LOSE");
    return;
  }

  setupInput();
}

function moveUp() {
  return slideTiles(grid.cellsByColumn);
}
function moveDown() {
  return slideTiles(grid.cellsByColumn.map((group) => group.reverse()));
}
function moveRight() {
  return slideTiles(grid.cellsByRow.map((group) => group.reverse()));
}
function moveLeft() {
  return slideTiles(grid.cellsByRow);
}

function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        let lastValidCell = null;
        if (cell.tile !== null) {
          for (let j = i - 1; j >= 0; j--) {
            const cellAbove = group[j];
            if (!cellAbove.canAccept(cell.tile)) break;
            lastValidCell = cellAbove;
          }

          if (lastValidCell !== null) {
            if (lastValidCell.tile !== null) {
              lastValidCell.mergeTile = cell.tile;
              promises.push(cell.tile.waitForTransitionEnd("transitionend"));
            } else {
              lastValidCell.tile = cell.tile;
            }
            cell.tile = null;
          }
        }
      }
      return promises;
    })
  );
}

function canMoveUp() {
  return canMove(grid.cellsByColumn);
}
function canMoveDown() {
  return canMove(grid.cellsByColumn.map((group) => group.reverse()));
}
function canMoveLeft() {
  return canMove(grid.cellsByRow);
}
function canMoveRight() {
  return canMove(grid.cellsByRow.map((group) => group.reverse()));
}

function canMove(cells) {
  return cells.some((group) =>
    group.some((cell, i) => {
      if (i === 0) return false;
      if (cell.tile === null) return false;
      return group[i - 1].canAccept(cell.tile);
    })
  );
}
