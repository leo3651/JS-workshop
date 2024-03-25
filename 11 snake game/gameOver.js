import { onSnake, snakeBody } from "./snake.js";

export let gameOver = false;

export function checkIfGameOver() {
  if (onSnake(snakeBody[0], { ignoreHead: true })) gameOver = true;
}
