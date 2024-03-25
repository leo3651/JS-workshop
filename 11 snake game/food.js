import { onSnake, expandSnake, snakeAte } from "./snake.js";

const EXPANSION_RATE = 5;
const GRID_SIZE = 21;

let food = getRandomPosition();

export function updateFood(gameBoard) {
  if (snakeAte(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomPosition();
  }
}

export function drawFood(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridRow = food.y;
  foodElement.style.gridColumn = food.x;

  gameBoard.append(foodElement);
}

function getRandomPosition() {
  let newFoodPosition = generateNewPosition();
  while (onSnake(newFoodPosition)) newFoodPosition = generateNewPosition();

  return newFoodPosition;
}

function generateNewPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}
