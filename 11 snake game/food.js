import { onSnake } from "./snake.js";

const food = { x: 11, y: 3 };

export function updateFood(gameBoard) {
  if (onSnake(food)) {
    food.x = 20;
    food.y = 20;
  }
}

export function drawFood(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridRow = food.y;
  foodElement.style.gridColumn = food.x;

  gameBoard.append(foodElement);
}
