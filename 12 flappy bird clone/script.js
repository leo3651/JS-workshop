import { updateBird, setInitialPositionOfBird, getBirdRect } from "./bird.js";

document.addEventListener("keypress", handleStart, { once: true });

const title = document.querySelector("[data-title]");
let lastTime;

function updateFrame(time) {
  if (lastTime) {
    const delta = time - lastTime;
    updateBird(delta);
  }
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(updateFrame);
}

function handleStart(e) {
  title.classList.add("hide");
  setInitialPositionOfBird();
  window.requestAnimationFrame(updateFrame);
}

function handleLose() {}

function checkLose() {
  const birdRect = getBirdRect();
  return birdRect.bottom >= window.innerHeight || birdRect.top <= 0;
}
