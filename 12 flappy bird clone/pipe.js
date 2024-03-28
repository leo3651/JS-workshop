const HOLE_HEIGHT = 200;
const pipes = [];

export function createPipe() {
  const pipeElement = document.createElement("div");
  pipeElement.classList.add("pipe");
  const topElement = createSegmentElement("top");
  const bottomElement = createSegmentElement("bottom");

  pipeElement.append(topElement);
  pipeElement.append(bottomElement);
  pipeElement.style.setProperty(
    "--bottom-of-top-pipe",
    randomNumberBetween(
      HOLE_HEIGHT * 1.5,
      window.innerHeight - HOLE_HEIGHT * 0.5
    )
  );
  document.body.append(pipeElement);
  pipes.push(pipeElement);
}

function createSegmentElement(position) {
  const segment = document.createElement("div");
  segment.classList.add("segment", position);
  return segment;
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min + 1);
}
