const SELECTIONS = [
  {
    name: "rock",
    emoji: "✊",
    beatsEmoji: "✌",
    beatsName: "scissors",
  },
  {
    name: "paper",
    emoji: "✋",
    beatsEmoji: "✊",
    beatsName: "rock",
  },
  { name: "scissors", emoji: "✌", beatsEmoji: "✋", beatsName: "paper" },
];

const selectionsCont = document.querySelector(".selections-container");
const finalColumn = document.querySelector("[data-final-column]");
const youScore = document.querySelector(".you--score");
const computerScore = document.querySelector(".computer--score");
const score = [0, 0];

selectionsCont.addEventListener("click", function (e) {
  const youSelected = SELECTIONS.find(
    (selection) => selection.emoji === e.target.textContent
  );
  const computerSelected = computerSelection();

  const computerWinner = isWinner(computerSelected, youSelected);
  const youWinner = isWinner(youSelected, computerSelected);

  console.log(youWinner, computerWinner);

  renderResult(computerSelected.emoji, computerWinner);
  renderResult(youSelected.emoji, youWinner);

  if (youWinner) score[0]++;
  if (computerWinner) score[1]++;

  incrementScore();
});

function incrementScore() {
  youScore.textContent = score[0];
  computerScore.textContent = score[1];
}

function renderResult(selection, winner) {
  const divElement = document.createElement("div");
  divElement.classList.add("result-selection");
  divElement.textContent = selection;

  if (winner) divElement.classList.add("winner");

  finalColumn.after(divElement);
}

function isWinner(selection, opponentSelection) {
  return selection.beatsEmoji === opponentSelection.emoji;
}

function computerSelection() {
  return SELECTIONS[Math.floor(Math.random() * SELECTIONS.length)];
}
