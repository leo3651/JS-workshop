import Ball from "./Ball.js";

const ball = new Ball(document.querySelector(".ball"));
let lastTime;

function updateFrame(time) {
  if (lastTime) {
    const delta = time - lastTime;
    ball.updatePosition(delta);
  }

  lastTime = time;
  window.requestAnimationFrame(updateFrame);
}

console.log(ball);
window.requestAnimationFrame(updateFrame);
