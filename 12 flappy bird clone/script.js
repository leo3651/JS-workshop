"use strict";

import { updateBird, setInitialPositionOfBird, getBirdRect } from "./bird.js";
import {
  setupPipe,
  updatePipe,
  getPassedPipesCount,
  getPipesRects,
} from "./pipe.js";

document.addEventListener("keypress", handleStart, { once: true });

const title = document.querySelector("[data-title]");
const subtitle = document.querySelector("[data-subtitle]");
let lastTime;

function updateFrame(time) {
  if (lastTime) {
    const delta = time - lastTime;
    updateBird(delta);
    updatePipe(delta);
  }
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(updateFrame);
}

function handleStart(e) {
  title.classList.add("hide");
  setInitialPositionOfBird();
  setupPipe();
  lastTime = false;
  window.requestAnimationFrame(updateFrame);
}

function handleLose() {
  subtitle.classList.remove("hide");
  title.classList.remove("hide");
  subtitle.textContent = `${getPassedPipesCount()} Pipes`;
  setTimeout(() => {
    document.addEventListener("keypress", handleStart, { once: true });
  }, 500);
}

function checkLose() {
  const birdRect = getBirdRect();
  const outsideWorld =
    birdRect.bottom >= window.innerHeight || birdRect.top <= 0;

  if (isCollision(birdRect)) return true;

  return outsideWorld;
}

function isCollision(birdRect) {
  return getPipesRects().some(
    (pipeRect) =>
      birdRect.top < pipeRect.bottom &&
      birdRect.bottom > pipeRect.top &&
      birdRect.left < pipeRect.right &&
      birdRect.right > pipeRect.left
  );
}
