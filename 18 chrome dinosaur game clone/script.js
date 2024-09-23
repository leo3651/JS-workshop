import { setupDino, updateDino, getDinoRect, setDinoLose } from "./dino.js";
import { setUpGround, updateGround } from "./ground.js";
import { setupCactus, updateCactus, getCactusesRects } from "./cactus.js";

const WORLD_wIDTH = 100;
const WORLD_HEIGHT = 30;
const WORLD_RATIO = WORLD_HEIGHT / WORLD_wIDTH;
const SPEED_SCALE_INCREASE = 0.00001;

const worldEl = document.querySelector(".world");
const scoreEl = document.querySelector(".score");
const startScreenEl = document.querySelector(".start-screen");

let lastTime;
let speedIncrease;
let score;

document.addEventListener("keydown", handleStart, { once: true });
window.addEventListener("resize", scaleWorld);

scaleWorld();

function scaleWorld() {
  let scale;
  const windowRatio = window.innerHeight / window.innerWidth;
  if (WORLD_RATIO > windowRatio) {
    scale = window.innerHeight / WORLD_HEIGHT;
  } else {
    scale = window.innerWidth / WORLD_wIDTH;
  }

  worldEl.style.height = `${scale * WORLD_HEIGHT}px`;
  worldEl.style.width = `${scale * WORLD_wIDTH}px`;
}

function handleStart() {
  lastTime = null;
  speedIncrease = 1;
  score = 0;
  startScreenEl.classList.add("hide");
  setUpGround();
  setupDino();
  setupCactus();
  window.requestAnimationFrame(updateFrame);
}

function updateFrame(time) {
  if (!lastTime) {
    lastTime = time;
    window.requestAnimationFrame(updateFrame);
    return;
  }

  const deltaTime = time - lastTime;
  lastTime = time;
  updateGround(deltaTime, speedIncrease);
  updateDino(deltaTime, speedIncrease);
  updateCactus(deltaTime, speedIncrease);
  if (checkLose()) {
    handleLose();
    return;
  }
  updateSpeed(deltaTime);
  updateScore(deltaTime);
  window.requestAnimationFrame(updateFrame);
}

function updateSpeed(delta) {
  speedIncrease += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreEl.textContent = Math.floor(score);
}

function checkLose() {
  const cactusesRects = getCactusesRects();
  const dinoRect = getDinoRect();
  if (
    cactusesRects.some((cactusRect) =>
      areRectsIntersecting(cactusRect, dinoRect)
    )
  ) {
    return true;
  }
  return false;
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startScreenEl.classList.remove("hide");
  }, 300);
}

function areRectsIntersecting(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}
