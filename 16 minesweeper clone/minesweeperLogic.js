export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

export let addToSumOfMinesLeft = 0;

class Tile {
  constructor(xCoordinate, yCoordinate, tileElement, mine) {
    this.x = xCoordinate;
    this.y = yCoordinate;
    this.tileElement = tileElement;
    this.mine = mine;
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

      const tile = new Tile(
        x,
        y,
        tileElement,
        minePositions.some(positionMatch.bind(null, { x, y }))
      );
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}

export function markTile(tileEl) {
  if (
    tileEl.instance.status !== TILE_STATUSES.MARKED &&
    tileEl.instance.status !== TILE_STATUSES.HIDDEN
  ) {
    return;
  }

  if (tileEl.instance.status === TILE_STATUSES.HIDDEN) {
    tileEl.instance.status = TILE_STATUSES.MARKED;
    addToSumOfMinesLeft = -1;
  } else {
    tileEl.instance.status = TILE_STATUSES.HIDDEN;
    addToSumOfMinesLeft = 1;
  }
}

export function revealTile(tileEl, board) {
  if (tileEl.instance.status !== TILE_STATUSES.HIDDEN) {
    return;
  }

  if (tileEl.instance.mine) {
    tileEl.instance.status = TILE_STATUSES.MINE;
    return;
  }

  tileEl.instance.status = TILE_STATUSES.NUMBER;
  const nearbyTiles = getNearbyTiles(tileEl, board);
  const mines = nearbyTiles.filter((tile) => tile.mine);
  if (mines.length) {
    tileEl.textContent = mines.length;
  } else {
    nearbyTiles.forEach((tile) => revealTile(tile.tileElement, board));
  }
}

function getMinePositions(numberOfMines, boardSize) {
  const minePositions = [];
  while (minePositions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!minePositions.some(positionMatch.bind(null, position))) {
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

function getNearbyTiles(tileEl, board) {
  const tiles = [];
  const { x, y } = tileEl.instance;

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) tiles.push(tile);
    }
  }

  return tiles;
}

export function checkWin(board) {
  return board.every((row) =>
    row.every(
      (tile) =>
        tile.status === TILE_STATUSES.NUMBER ||
        (tile.status === TILE_STATUSES.HIDDEN && tile.mine) ||
        (tile.status === TILE_STATUSES.MARKED && tile.mine)
    )
  );
}

export function checkLose(board) {
  return board.some((row) =>
    row.some((tile) => tile.status === TILE_STATUSES.MINE)
  );
}
