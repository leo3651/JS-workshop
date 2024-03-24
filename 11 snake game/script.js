import { SNAKE_SPEED, updateSnake, drawSnake } from "./snake.js";
import { directions } from "./inputDirections.js";

let lastRender = 0;
const gameBoard = document.getElementById("game-board");

function updateFrame(time) {
  window.requestAnimationFrame(updateFrame);

  const secondsSinceLastRender = (time - lastRender) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  console.log(secondsSinceLastRender);
  lastRender = time;

  update();
  draw();
}

window.requestAnimationFrame(updateFrame);

function update() {
  updateSnake(directions);
}

function draw() {
  drawSnake(gameBoard);
}
