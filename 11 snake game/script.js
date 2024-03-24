import { SNAKE_SPEED, updateSnake, drawSnake } from "./snake.js";

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
  updateSnake();
}

function draw() {
  drawSnake(gameBoard);
}

export const directions = { x: 0, y: 0 };
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    directions.x = -1;
    directions.y = 0;
  }
  if (e.key === "ArrowRight") {
    directions.x = 1;
    directions.y = 0;
  }
  if (e.key === "ArrowUp") {
    directions.x = 0;
    directions.y = -1;
  }
  if (e.key === "ArrowDown") {
    directions.x = 0;
    directions.y = 1;
  }
});
