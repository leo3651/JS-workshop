export const directions = { x: 0, y: 0 };

// changes directions on input
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    if (directions.x !== 0) return;
    directions.x = -1;
    directions.y = 0;
  }
  if (e.key === "ArrowRight") {
    if (directions.x !== 0) return;
    directions.x = 1;
    directions.y = 0;
  }
  if (e.key === "ArrowUp") {
    if (directions.y !== 0) return;
    directions.x = 0;
    directions.y = -1;
  }
  if (e.key === "ArrowDown") {
    if (directions.y !== 0) return;
    directions.x = 0;
    directions.y = 1;
  }
});
