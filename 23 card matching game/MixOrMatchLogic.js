const COUNT_DOWN_TIME = 1000;

export class AudioController {
  #bgMusic;
  #flipMusic;
  #matchMusic;
  #gameOverMusic;
  #victoryMusic;

  constructor() {
    this.#bgMusic = new Audio("Assets/Audio/creepy.mp3");
    this.#flipMusic = new Audio("Assets/Audio/flip.wav");
    this.#matchMusic = new Audio("Assets/Audio/match.wav");
    this.#gameOverMusic = new Audio("Assets/Audio/gameOver.wav");
    this.#victoryMusic = new Audio("Assets/Audio/victory.wav");
    this.#bgMusic.volume = 0.5;
    this.#bgMusic.loop = true;
  }

  startBgMusic() {
    this.#bgMusic.play();
  }

  stopBgMusic() {
    this.#bgMusic.pause();
    this.#bgMusic.currentTime = 0;
  }

  startFlipMusic() {
    this.#flipMusic.play();
  }

  startMatchMusic() {
    this.#matchMusic.play();
  }

  startGameOverMusic() {
    this.stopBgMusic();
    this.#gameOverMusic.play();
  }

  startVictoryMusic() {
    this.stopBgMusic();
    this.#victoryMusic.play();
  }
}

export class MixOrMatch {
  #audioController;
  #cardsElemsArr;
  #totalTime;
  #timeRemaining;
  #timeEl;
  #countdownInterval;
  #flipsEl;
  #totalClicks = 0;
  #animationInProgress = false;
  #cardToCheckForMatch = null;

  constructor(cardsElemsArr, totalTime) {
    this.#cardsElemsArr = cardsElemsArr;
    this.#audioController = new AudioController();
    this.#timeEl = document.querySelector(".time");
    this.#flipsEl = document.querySelector(".flips");
    this.#totalTime = totalTime;
  }

  startGame() {
    this.#audioController.startBgMusic();
    this.#shuffleCards();
    this.#hideCards();
    this.#timeRemaining = this.#totalTime;
    this.#totalClicks = 0;
    this.#flipsEl.textContent = this.#totalClicks;

    setTimeout(() => {
      this.#startCountdown();
    }, 300);
  }

  flipCard(card) {
    if (!this.#canFlipCard(card)) return;
    card.classList.add("visible");
    this.#audioController.startFlipMusic();
    this.#totalClicks++;
    this.#flipsEl.textContent = this.#totalClicks;

    if (this.#cardToCheckForMatch) {
      this.#checkCardsMatch(card);
    } else {
      this.#cardToCheckForMatch = card;
    }
  }

  #canFlipCard(card) {
    return (
      !this.#animationInProgress &&
      !card.classList.contains("matched") &&
      card !== this.#cardToCheckForMatch
    );
  }

  #checkCardsMatch(card) {
    const card1Value = this.#getCardValue(this.#cardToCheckForMatch);
    const card2Value = this.#getCardValue(card);

    if (card1Value === card2Value) {
      this.#addMatchedFlag(card, this.#cardToCheckForMatch);
    } else {
      this.#flipCardsBack(card, this.#cardToCheckForMatch);
    }

    this.#cardToCheckForMatch = null;
  }

  #getCardValue(card) {
    return card.querySelector(".card-value").src;
  }

  #addMatchedFlag(card1, card2) {
    this.#audioController.startMatchMusic();
    card1.classList.add("matched");
    card2.classList.add("matched");
    this.#checkWin();
  }

  #flipCardsBack(card1, card2) {
    this.#animationInProgress = true;
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.#animationInProgress = false;
    }, 1000);
  }

  #hideCards() {
    this.#cardsElemsArr.forEach((cardEl) => {
      cardEl.classList.remove("visible");
      cardEl.classList.remove("matched");
    });
  }

  #shuffleCards() {
    for (let i = this.#cardsElemsArr.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      this.#cardsElemsArr[i].style.order = randomIndex;
      this.#cardsElemsArr[randomIndex].style.order = i;
    }
  }

  #startCountdown() {
    this.#countdownInterval = setInterval(() => {
      this.#timeEl.textContent = this.#timeRemaining;
      this.#timeRemaining--;
      if (this.#timeRemaining === -1) {
        this.#gameOver();
      }
    }, COUNT_DOWN_TIME);
  }

  #gameOver() {
    clearInterval(this.#countdownInterval);
    this.#audioController.startGameOverMusic();
    document.getElementById("game-over-text").classList.add("show");
  }

  #victory() {
    clearInterval(this.#countdownInterval);
    this.#audioController.startVictoryMusic();
    document.getElementById("victory-text").classList.add("show");
  }

  #checkWin() {
    const win = this.#cardsElemsArr.every((card) =>
      card.classList.contains("matched")
    );
    if (win) {
      this.#victory();
    }
  }
}
