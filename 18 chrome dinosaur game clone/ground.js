import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const groundElems = document.querySelectorAll(".ground");

export function setUpGround() {
  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", 300);
}

export function updateGround(delta, speedIncrease) {
  groundElems.forEach((groundElement) => {
    incrementCustomProperty(
      groundElement,
      "--left",
      delta * speedIncrease * SPEED * -1
    );

    if (getCustomProperty(groundElement, "--left") <= -300) {
      incrementCustomProperty(groundElement, "--left", 600);
    }
  });
}
