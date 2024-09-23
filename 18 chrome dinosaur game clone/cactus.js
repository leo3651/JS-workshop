import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const worldEl = document.querySelector(".world");

const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;

let nextCactusTime;
export function setupCactus() {
  nextCactusTime = 0;
  document.querySelectorAll(".cactus").forEach((cactus) => cactus.remove());
}

export function updateCactus(deltaTime, speedIncrease) {
  document.querySelectorAll(".cactus").forEach((cactus) => {
    incrementCustomProperty(
      cactus,
      "--left",
      SPEED * speedIncrease * -1 * deltaTime
    );
    if (getCustomProperty(cactus, "--left") <= -50) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
      speedIncrease;
  }
  nextCactusTime -= deltaTime;
}

function createCactus() {
  const cactusEl = document.createElement("img");
  cactusEl.classList.add("cactus");
  cactusEl.src = "./images/cactus.png";
  setCustomProperty(cactusEl, "--left", 100);
  worldEl.appendChild(cactusEl);
}

function randomNumberBetween(min, max) {
  return Math.floor(min + (max - min + 1) * Math.random());
}

export function getCactusesRects() {
  return [...document.querySelectorAll(".cactus")].map((cactus) =>
    cactus.getBoundingClientRect()
  );
}
