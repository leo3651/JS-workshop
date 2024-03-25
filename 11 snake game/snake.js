export const SNAKE_SPEED = 2;

const snakeBody = [{ x: 11, y: 11 }];

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

const equalPosition = function (snakeBodyElement, food) {
  return snakeBodyElement.x === food.x && snakeBodyElement.y === food.y;
};

export const onSnake = function (food) {
  return snakeBody.some((snakeBodyElement) =>
    equalPosition(snakeBodyElement, food)
  );
};

export function expandSnake(expansionRate) {
  for (let i = 0; i < expansionRate; i++) {
    snakeBody.push({ ...snakeBody.at(-1) });
  }
}
