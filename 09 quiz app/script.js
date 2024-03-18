const btnStart = document.getElementById("start-btn");
const btnNext = document.getElementById("next-btn");
const container = document.querySelector(".container");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers");
const questionElement = document.getElementById("question");

let currentQuestionIndex = 0;

btnStart.addEventListener("click", startGame);
btnNext.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion(questions);
});

function startGame() {
  questionContainer.classList.remove("hide");
  container.classList.remove("max-width");
  btnStart.classList.add("hide");

  currentQuestionIndex = 0;
  shuffleArray(questions);
  setNextQuestion(questions);
}

function setNextQuestion(shuffeledQuestionsArray) {
  btnNext.classList.add("hide");
  clearStyle(document.body);
  answersContainer.innerHTML = "";
  answersContainer.addEventListener("click", checkAnswer);

  questionElement.textContent =
    shuffeledQuestionsArray[currentQuestionIndex].question;

  shuffeledQuestionsArray[currentQuestionIndex].answers.forEach((answer) => {
    const btn = document.createElement("button");
    const span = document.createElement("span");
    btn.classList.add("btn");

    btn.append(span);
    span.innerText = answer.text;

    if (answer.correct) btn.dataset.correct = answer.correct;

    answersContainer.append(btn);
  });
}

function checkAnswer(e) {
  const btnClicked = e.target.closest(".btn");
  if (!btnClicked) return;

  const correct = btnClicked.dataset.correct;

  setStyle(document.body, correct);
  Array.from(answersContainer.children).forEach((answer) =>
    setStyle(answer, answer.dataset.correct)
  );
  answersContainer.removeEventListener("click", checkAnswer);

  if (currentQuestionIndex + 1 > questions.length - 1) {
    btnStart.firstElementChild.innerText = "Restart";
    btnStart.classList.remove("hide");
  } else btnNext.classList.remove("hide");
}

function setStyle(element, boolean) {
  if (boolean) element.classList.add("correct");
  else element.classList.add("wrong");
}

function clearStyle(element) {
  element.classList.remove("wrong");
  element.classList.remove("correct");
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
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Vincent van Gogh", correct: false },
      { text: "Michelangelo", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "NaCl", correct: false },
      { text: "O2", correct: false },
    ],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "J.K. Rowling", correct: false },
      { text: "Charles Dickens", correct: false },
      { text: "Mark Twain", correct: false },
    ],
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "Mount Everest", correct: true },
      { text: "K2", correct: false },
      { text: "Kangchenjunga", correct: false },
      { text: "Lhotse", correct: false },
    ],
  },
];
