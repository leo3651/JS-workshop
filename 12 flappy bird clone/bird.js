const birdElement = document.querySelector("[data-bird]");
const BIRD_SPEED = 0.4;
const JUMP_DURATION = 225;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

export function updateBird(delta) {
  if (timeSinceLastJump < JUMP_DURATION) {
    setTop(getTop() - BIRD_SPEED * delta);
  } else {
    setTop(getTop() + BIRD_SPEED * delta);
  }
  timeSinceLastJump += delta;
}

function setTop(top) {
  birdElement.style.setProperty("--bird-top", top);
}

function getTop() {
  return Number.parseFloat(
    getComputedStyle(birdElement).getPropertyValue("--bird-top")
  );
}

export function getBirdRect() {
  return birdElement.getBoundingClientRect();
}

export function setInitialPositionOfBird() {
  setTop(window.innerHeight / 2);
  document.removeEventListener("keydown", handleJump);
  document.addEventListener("keydown", handleJump);
}

function handleJump(e) {
  if (e.code !== "Space") return;

  timeSinceLastJump = 0;
}
