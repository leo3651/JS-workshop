"use strict";

let pipes = [];
const HOLE_HEIGHT = 200;
const PIPE_WIDTH = 120;
const PIPE_INTERVAL = 1500;
const PIPE_SPEED = 0.75;
let timeSinceLastPipe;
let pipesCount = 0;

export function updatePipe(delta) {
  timeSinceLastPipe += delta;

  if (PIPE_INTERVAL < timeSinceLastPipe) {
    timeSinceLastPipe -= PIPE_INTERVAL;
    createPipe();
  }
  pipes.forEach((pipe) => {
    if (pipe.left <= -PIPE_WIDTH) {
      pipesCount++;
      return pipe.remove();
    }
    pipe.left = Number.parseFloat(pipe.left) - delta * PIPE_SPEED;
  });
}

export function setupPipe() {
  document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH);
  document.documentElement.style.setProperty("--pipe-hole", HOLE_HEIGHT);
  timeSinceLastPipe = PIPE_INTERVAL;
  pipes.forEach((pipe) => pipe.remove());
  pipesCount = 0;
}

export function getPassedPipesCount() {
  return pipesCount;
}

export function getPipesRects() {
  return pipes.flatMap((pipe) => pipe.rects());
}

function createPipe() {
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

  const pipe = {
    get left() {
      return Number.parseFloat(
        getComputedStyle(pipeElement).getPropertyValue("--pipe-left")
      );
    },
    set left(value) {
      pipeElement.style.setProperty("--pipe-left", value);
    },
    remove() {
      pipeElement.remove();
      pipes = pipes.filter((p) => p !== this);
    },
    rects() {
      return [
        topElement.getBoundingClientRect(),
        bottomElement.getBoundingClientRect(),
      ];
    },
  };

  pipe.left = window.innerWidth;
  document.body.append(pipeElement);
  pipes.push(pipe);
}

function createSegmentElement(position) {
  const segment = document.createElement("div");
  segment.classList.add("segment", position);
  return segment;
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
