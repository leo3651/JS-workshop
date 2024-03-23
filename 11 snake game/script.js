let lastRender = 0;
const SNAKE_SPEED = 1 / 2;

function updateFrame(time) {
  window.requestAnimationFrame(updateFrame);

  const secondsSinceLastRender = (time - lastRender) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  console.log(secondsSinceLastRender);
  lastRender = time;
}

window.requestAnimationFrame(updateFrame);
