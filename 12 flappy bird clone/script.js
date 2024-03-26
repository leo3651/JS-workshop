import { updateBird } from "./bird.js";

document.addEventListener("keypress", handleStart, { once: true });

const title = document.querySelector("[data-title]");
let lastTime;

function updateFrame(time) {
  window.requestAnimationFrame(updateFrame);

  if (lastTime) {
    const delta = time - lastTime;
    console.log(delta);
    updateBird(delta);
  }
  lastTime = time;
}

function handleStart(e) {
  title.classList.add("hide");
  window.requestAnimationFrame(updateFrame);
}

function handleLose() {}
