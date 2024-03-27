import { updateBird, setInitialPositionOfBird, getBirdRect } from "./bird.js";

document.addEventListener("keypress", handleStart, { once: true });

const title = document.querySelector("[data-title]");
const subtitle = document.querySelector("[data-subtitle]");
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
  lastTime = false;
  window.requestAnimationFrame(updateFrame);
}

function handleLose() {
  subtitle.classList.remove("hide");
  title.classList.remove("hide");
  subtitle.textContent = `${0} Pipes`;
  setTimeout(() => {
    document.addEventListener("keypress", handleStart, { once: true });
  }, 500);
}

function checkLose() {
  const birdRect = getBirdRect();
  return birdRect.bottom >= window.innerHeight || birdRect.top <= 0;
}
