import { MixOrMatch } from "./MixOrMatchLogic.js";

const cardsElemsArr = [...document.querySelectorAll(".card")];
const game = new MixOrMatch(cardsElemsArr, 100);

document.addEventListener("click", handleClick);

function handleClick(e) {
  const overlay = e.target.closest(".overlay-text");
  const card = e.target.closest(".card");

  if (overlay) {
    overlay.classList.remove("show");
    game.startGame();
  }

  if (card) {
    game.flipCard(card);
  }
}
