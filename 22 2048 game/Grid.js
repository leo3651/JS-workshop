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

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile === null);
  }

  get cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

  get cellsByRow() {
    let cellsIndex = 0;
    const cellByRows = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (!cellByRows[j]) cellByRows[j] = [];
        cellByRows[j][i] = this.#cells[cellsIndex];
        cellsIndex++;
      }
    }
    return cellByRows;
  }

  get randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells[randomIndex];
  }
}

class Cell {
  #cellEl;
  #x;
  #y;
  #tile;

  constructor(cellElement, x, y) {
    this.#cellEl = cellElement;
    this.#x = x;
    this.#y = y;
    this.#tile = null;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get tile() {
    return this.#tile;
  }

  set tile(value) {
    this.#tile = value;
    if (value === null) return;
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
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
