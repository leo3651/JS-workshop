import { setUpGround, updateGround } from "./ground.js";

const WORLD_wIDTH = 100;
const WORLD_HEIGHT = 30;
const WORLD_RATIO = WORLD_HEIGHT / WORLD_wIDTH;

const worldEl = document.querySelector(".world");
const scoreEl = document.querySelector(".score");
const startScreenEl = document.querySelector(".start-screen");

window.addEventListener("resize", scaleWorld);
scaleWorld();
setUpGround();

document.addEventListener("keydown", handleStart, { once: true });

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

let lastTime;
function updateFrame(time) {
  if (!lastTime) {
    lastTime = time;
    window.requestAnimationFrame(updateFrame);
    return;
  }

  const deltaTime = time - lastTime;
  lastTime = time;
  updateGround(deltaTime, 1);
  window.requestAnimationFrame(updateFrame);
}

function handleStart() {
  window.requestAnimationFrame(updateFrame);
}
