export const SNAKE_SPEED = 2;

export const snakeBody = [{ x: 11, y: 11 }];

export function updateSnake(directions) {
  if (snakeBody.length > 1) {
    const lastSnakeElement = snakeBody.pop();
    lastSnakeElement.x = snakeBody[0].x + directions.x;
    lastSnakeElement.y = snakeBody[0].y + directions.y;
    snakeBody.unshift(lastSnakeElement);
  } else {
    snakeBody[0].x += directions.x;
    snakeBody[0].y += directions.y;
  }

  if (snakeBody[0].y <= 0) return (snakeBody[0].y = 21);
  if (snakeBody[0].y >= 22) return (snakeBody[0].y = 1);
  if (snakeBody[0].x <= 0) return (snakeBody[0].x = 21);
  if (snakeBody[0].x >= 22) return (snakeBody[0].x = 1);
}

export function drawSnake(gameBoard) {
  snakeBody.forEach((snakeElement) => {
    const newSnakeElement = document.createElement("div");
    newSnakeElement.classList.add("snake");
    newSnakeElement.style.gridRow = snakeElement.y;
    newSnakeElement.style.gridColumn = snakeElement.x;
    gameBoard.append(newSnakeElement);
  });
}

const equalPosition = (snakeBodyElement, position) =>
  snakeBodyElement.x === position.x && snakeBodyElement.y === position.y;

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((snakeBodyElement, index) => {
    console.log(position, snakeBodyElement);
    console.log(snakeBody);
    console.log("equal position:", equalPosition(snakeBodyElement, position));
    console.log("ignore head and index === ", ignoreHead && index === 0);
    if (ignoreHead && index === 0) return false;
    return equalPosition(snakeBodyElement, position);
  });
}

export function snakeAte(foodPosition) {
  return equalPosition(snakeBody[0], foodPosition);
}

export function expandSnake(expansionRate) {
  for (let i = 0; i < expansionRate; i++) {
    snakeBody.push({ ...snakeBody.at(-1) });
  }
}
