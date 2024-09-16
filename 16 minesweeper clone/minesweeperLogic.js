const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

class Tile {
  constructor(xCoordinate, yCoordinate, tileElement) {
    this.x = xCoordinate;
    this.y = yCoordinate;
    this.tileElement = tileElement;
  }

  set status(value) {
    this.tileElement.dataset.status = value;
  }

  get status() {
    return this.tileElement.dataset.status;
  }
}

export function createBoard(boardSize, numberOfMines) {
  const board = [];
  const minePositions = getMinePositions(numberOfMines, boardSize);
  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const tileElement = document.createElement("div");
      tileElement.dataset.status = TILE_STATUSES.HIDDEN;
      const tile = new Tile(x, y, tileElement);
      tile.mine = minePositions.some((pos) => positionMatch(pos, tile));
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}

function getMinePositions(numberOfMines, boardSize) {
  const minePositions = [];
  while (minePositions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!minePositions.some((pos) => positionMatch(pos, position))) {
      minePositions.push(position);
    }
  }

  return minePositions;
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}

function randomNumber(boardSize) {
  return Math.floor(Math.random() * boardSize);
}
