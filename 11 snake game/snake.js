export const SNAKE_SPEED = 1 / 2;
import { directions } from "./script.js";
const snakeBody = [
  { x: 11, y: 11 },
  { x: 10, y: 11 },
  { x: 9, y: 11 },
];

export function updateSnake() {
  console.log("snake updated");
}

export function drawSnake(gameBoard) {
  console.log("draw snake");
  gameBoard.innerHTML = "";

  const lastSnakeElement = snakeBody.pop();
  lastSnakeElement.x = snakeBody[0].x + directions.x;
  lastSnakeElement.y = snakeBody[0].y + directions.y;
  snakeBody.unshift(lastSnakeElement);

  snakeBody.forEach((snakeElement) => {
    const newSnakeElement = document.createElement("div");
    newSnakeElement.classList.add("snake");
    newSnakeElement.style.gridRow = snakeElement.y;
    newSnakeElement.style.gridColumn = snakeElement.x;
    gameBoard.append(newSnakeElement);
  });
}
