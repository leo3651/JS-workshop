const birdElement = document.querySelector("[data-bird]");

export function updateBird(delta) {
  console.log("HELLO");

  console.log(getTop());
  setTop(200);
}

function setTop(top) {
  birdElement.style.setProperty("--bird-top", top);
}

function getTop() {
  return getComputedStyle(birdElement).getPropertyValue("--bird-top");
}
