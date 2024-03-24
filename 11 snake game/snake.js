export const SNAKE_SPEED = 1;

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
}

export function drawSnake(gameBoard) {
  gameBoard.innerHTML = "";

  snakeBody.forEach((snakeElement) => {
    const newSnakeElement = document.createElement("div");
    newSnakeElement.classList.add("snake");
    newSnakeElement.style.gridRow = snakeElement.y;
    newSnakeElement.style.gridColumn = snakeElement.x;
    gameBoard.append(newSnakeElement);
  });
}
