const directions = { x: 0, y: 0 };
let previousDirections = { x: 0, y: 0 };

export const getInputDirections = function () {
  previousDirections = { ...directions };
  return directions;
};

// changes directions on input
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    if (previousDirections.x !== 0) return;
    directions.x = -1;
    directions.y = 0;
  }
  if (e.key === "ArrowRight") {
    if (previousDirections.x !== 0) return;
    directions.x = 1;
    directions.y = 0;
  }
  if (e.key === "ArrowUp") {
    if (previousDirections.y !== 0) return;
    directions.x = 0;
    directions.y = -1;
  }
  if (e.key === "ArrowDown") {
    if (previousDirections.y !== 0) return;
    directions.x = 0;
    directions.y = 1;
  }
});
