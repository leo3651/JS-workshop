import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const dinoEl = document.querySelector(".dino");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let currentFrameTime;
let dinoFrame;
let yVelocity;

export function setupDino() {
  isJumping = false;
  currentFrameTime = 0;
  dinoFrame = 0;
  setCustomProperty(dinoEl, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function updateDino(deltaTime, speedIncrease) {
  handleRun(deltaTime, speedIncrease);
  handleJump(deltaTime);
}

function handleJump(deltaTime) {
  if (!isJumping) return;

  incrementCustomProperty(dinoEl, "--bottom", yVelocity * deltaTime);

  if (getCustomProperty(dinoEl, "--bottom") <= 0) {
    setCustomProperty(dinoEl, "--bottom", 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * deltaTime;
}

function handleRun(deltaTime, speedIncrease) {
  if (isJumping) {
    return (dinoEl.src = "./images/dino-stationary.png");
  }

  if (currentFrameTime > FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoEl.src = `./images/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += deltaTime * speedIncrease;
}

function onJump(e) {
  if (e.code === "Space" && !isJumping) {
    yVelocity = JUMP_SPEED;
    isJumping = true;
  }
}

export function getDinoRect() {
  return document.querySelector(".dino").getBoundingClientRect();
}

export function setDinoLose() {
  dinoEl.src = "./images/dino-lose.png";
}
