const btnStart = document.getElementById("start-btn");
const container = document.querySelector(".container");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers");
const questionElement = document.getElementById("question");

let currentQuestionIndex = 0;

btnStart.addEventListener("click", startGame);

function startGame() {
  questionContainer.classList.remove("hide");
  container.classList.remove("max-width");
  btnStart.classList.add("hide");

  shuffleArray(questions);
  setNextQuestion(questions);
}

function setNextQuestion(shuffeledQuestionsArray) {
  answersContainer.innerHTML = "";

  shuffeledQuestionsArray[currentQuestionIndex].answers.forEach((answer) =>
    answersContainer.insertAdjacentHTML(
      "afterbegin",
      `          <button class="btn"><span>${answer.text}</span></button>`
    )
  );

  questionElement.textContent =
    shuffeledQuestionsArray[currentQuestionIndex].question;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "8", correct: false },
    ],
  },
];
