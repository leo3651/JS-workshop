const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;
const BORDER_RADIUS = 1;

export class Grid {
  #cells;

  constructor(gridEl) {
    gridEl.style.setProperty("--grid-size", `${GRID_SIZE}`);
    gridEl.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
    gridEl.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
    gridEl.style.setProperty("--border-radius", `${BORDER_RADIUS}vmin`);
    this.#cells = fillGameBoardWithCells(gridEl);
  }
}

class Cell {
  constructor(cellElement, x, y) {
    this.cellEl = cellElement;
    this.x = x;
    this.y = y;
  }
}

function fillGameBoardWithCells(gridEl) {
  const cells = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const cellEl = document.createElement("div");
      cellEl.classList.add("cell");
      gridEl.append(cellEl);
      cells.push(new Cell(cellEl, i, j));
    }
  }
  return cells;
}
