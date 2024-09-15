const RANDOM_QUOTE = "https://api.quotable.io/random";
const quoteEl = document.getElementById("quote");
const textArea = document.getElementById("textArea");
const timer = document.getElementById("timer");

let Interval;

textArea.addEventListener("input", () => {
  let correct = true;
  const quoteChars = [...quoteEl.querySelectorAll("span")];
  const textAreaChars = textArea.value.split("");
  quoteChars.forEach((charSpan, index) => {
    if (index > textAreaChars.length - 1) {
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");
      correct = false;
      return;
    }
    if (charSpan.innerText === textAreaChars[index]) {
      charSpan.classList.add("correct");
    } else {
      charSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) {
    clearInterval(Interval);
    renderNewQuote();
  }
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE)
    .then((res) => res.json())
    .then(({ content }) => content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteEl.innerHTML = "";
  textArea.value = "";
  quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quoteEl.appendChild(charSpan);
  });
  startTimer();
}

function startTimer() {
  timer.innerText = 0;
  Interval = setInterval(() => {
    timer.innerText++;
  }, 1000);
}

renderNewQuote();
