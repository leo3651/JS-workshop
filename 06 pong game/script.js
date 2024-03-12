import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

let lastTime;
const ball = new Ball(document.querySelector(".ball"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");

function updateFrame(time) {
  if (lastTime) {
    const delta = time - lastTime;

    ball.updatePosition(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.updatePaddle(delta, ball.y);

    const hue = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
  }

  if (isLose()) handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateFrame);
}
window.requestAnimationFrame(updateFrame);

// move the player paddle where the mouse is
document.addEventListener("mousemove", function (e) {
  playerPaddle.position = (e.y / window.innerHeight) * 100;

  const playerPaddleRect = playerPaddle.rect();

  if (playerPaddleRect.bottom >= window.innerHeight) playerPaddle.position = 94;
  if (playerPaddleRect.top <= 0) playerPaddle.position = 6;
});

function isLose() {
  // hit left/right ?
  const ballRect = ball.rect();
  return ballRect.left <= 0 || ballRect.right >= window.innerWidth;
}

function handleLose() {
  const ballRect = ball.rect();

  // increment score
  if (ballRect.right >= window.innerWidth)
    playerScore.textContent = Number(playerScore.textContent) + 1;
  else computerScore.textContent = Number(computerScore.textContent) + 1;

  // reset game
  ball.reset();
  computerPaddle.reset();
  playerPaddle.reset();
}
