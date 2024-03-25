import { SNAKE_SPEED, updateSnake, drawSnake } from "./snake.js";
import { updateFood, drawFood } from "./food.js";
import { getInputDirections } from "./inputDirections.js";
import { checkIfGameOver, gameOver } from "./gameOver.js";

let lastRender = 0;
const gameBoard = document.getElementById("game-board");

function updateFrame(time) {
  if (gameOver) {
    if (confirm("You lost. Ok for restart")) window.location = "/";
    return;
  }

  window.requestAnimationFrame(updateFrame);
  const secondsSinceLastRender = (time - lastRender) / 1000;

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRender = time;

  update();
  draw();
}

window.requestAnimationFrame(updateFrame);

function update() {
  const directions = getInputDirections();

  updateSnake(directions);
  checkIfGameOver();
  updateFood(gameBoard);
}

function draw() {
  gameBoard.innerHTML = "";

  drawFood(gameBoard);
  drawSnake(gameBoard);
}
