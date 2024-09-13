"use-strict";
const main = document.querySelector("main");

main.addEventListener("dragstart", (e) => {
  console.log(e);
  console.log(e.target);
  const dragableElement = e.target;
  dragableElement.classList.add("dragging");
});

main.addEventListener("dragend", (e) => {
  const dragableElement = e.target;
  dragableElement.classList.remove("dragging");
});

main.addEventListener("dragover", (e) => {
  e.preventDefault();
  const container = e.target.closest(".container");
  const draggingEl = document.querySelector(".dragging");
  const allElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  const elBelowDraggingEl = getElBelowDraggingEl(allElements, e.clientY);
  if (elBelowDraggingEl) {
    container.insertBefore(draggingEl, elBelowDraggingEl);
  } else {
    container.appendChild(draggingEl);
  }
});

function getElBelowDraggingEl(containerElements, clientY) {
  for (const [index, el] of containerElements.entries()) {
    const position = el.getBoundingClientRect();
    const middleOfEl = position.y + (position.bottom - position.y) / 2;
    if (middleOfEl > clientY) {
      return el;
    }
  }
  return null;
}
