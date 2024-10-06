const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
  progressBar: true,
  pauseOnHover: true,
  PauseOnFocusLost: true,
};

export class Toast {
  #toastEl;

  #pauseToastBound;
  #resetToastBound;
  #visibilityChangeBound;

  #autoClose;
  #hoverAutoClose;
  #closeToastBound;

  #pausedAt;
  #visibleSince;
  #timeVisible;
  #visibleLeft;

  #paused = false;
  #progressBarAllowed = true;

  constructor(options) {
    this.#toastEl = document.createElement("div");
    this.#toastEl.classList.add("toast");

    this.#closeToastBound = this.#closeToast.bind(this);
    this.#pauseToastBound = this.#pauseToast.bind(this);
    this.#resetToastBound = this.#unpauseToast.bind(this);
    this.#visibilityChangeBound = this.#visibilityChange.bind(this);

    window.requestAnimationFrame(() => this.#toastEl.classList.add("show"));
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }

  set position(value) {
    const originalContainer = this.#toastEl.parentElement;

    const selector = `.toast-container[data-position=${value}]`;
    const container =
      document.querySelector(selector) || this.#createCont(value);
    container.append(this.#toastEl);

    if (originalContainer && !originalContainer.hasChildNodes()) {
      originalContainer.remove();
    }
  }

  set text(value) {
    this.#toastEl.textContent = value;
  }

  set autoClose(value) {
    if (this.#autoClose) {
      clearTimeout(this.#autoClose);
    }

    this.#timeVisible = value;
    this.#visibleSince = new Date();

    if (value === false) return;

    this.#clearPauseOnHover();
    this.#autoClose = setTimeout(() => this.#remove(), value);
  }

  set canClose(value) {
    this.#toastEl.classList.toggle("can-close", value);
    if (value) {
      this.#toastEl.addEventListener("click", this.#closeToastBound, {
        once: true,
      });
    } else {
      this.#toastEl.removeEventListener("click", this.#closeToastBound);
    }
  }

  set pauseOnHover(value) {
    if (value) {
      this.#toastEl.addEventListener("mouseenter", this.#pauseToastBound);
      this.#toastEl.addEventListener("mouseout", this.#resetToastBound);
    } else {
      this.#clearPauseOnHover();
      this.#toastEl.removeEventListener("mouseenter", this.#pauseToastBound);
      this.#toastEl.removeEventListener("mouseout", this.#resetToastBound);
    }
  }

  set progressBar(value) {
    if (value) {
      this.#progressBarAllowed = true;
      this.progressBarWidth = 1;
      this.#toastEl.classList.add("progress-bar");
      if (this.#timeVisible === false) return;
      window.requestAnimationFrame(this.#decreaseProgressBarWidth.bind(this));
    } else {
      this.#progressBarAllowed = false;
      this.#toastEl.classList.remove("progress-bar");
      this.progressBarWidth = 0;
    }
  }

  set PauseOnFocusLost(value) {
    if (value) {
      document.addEventListener(
        "visibilitychange",
        this.#visibilityChangeBound
      );
    } else {
      document.removeEventListener(
        "visibilitychange",
        this.#visibilityChangeBound
      );
    }
  }

  get #progressBarWidth() {
    return getComputedStyle(this.#toastEl).getPropertyValue("--progress-width");
  }

  set #progressBarWidth(value) {
    this.#toastEl.style.setProperty("--progress-width", value);
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => (this[key] = value));
  }

  #remove() {
    this.#toastEl.classList.remove("show");
    const toastContainer = this.#toastEl.parentElement;
    this.onClose();
    this.#toastEl.removeEventListener("mouseenter", this.#pauseToastBound);
    this.#toastEl.removeEventListener("mouseout", this.#resetToastBound);

    this.#toastEl.addEventListener(
      "transitionend",
      () => {
        this.#toastEl.remove();
        if (!toastContainer.hasChildNodes()) {
          toastContainer.remove();
        }
      },
      { once: true }
    );
  }

  #createCont(value) {
    const container = document.createElement("div");
    container.classList.add("toast-container");
    container.dataset.position = value;
    document.body.append(container);
    return container;
  }

  #closeToast(e) {
    if (e.target.closest(".toast")) {
      this.#remove();
    }
  }

  #decreaseProgressBarWidth() {
    if (+this.#progressBarWidth <= 0 || !this.#progressBarAllowed) {
      return;
    }
    console.log("in");

    if (this.#paused === false) {
      if (this.#pausedAt) {
        this.#visibleSince =
          Number(this.#visibleSince) + (new Date() - this.#pausedAt);
        this.#pausedAt = null;
      }

      const visibleFor = new Date().getTime() - Number(this.#visibleSince);
      this.#visibleLeft = this.#timeVisible - visibleFor;

      this.#progressBarWidth = this.#visibleLeft / this.#timeVisible;
    }

    window.requestAnimationFrame(this.#decreaseProgressBarWidth.bind(this));
  }

  #pauseToast() {
    this.#pausedAt = new Date();
    this.#paused = true;
    clearTimeout(this.#autoClose);
    clearTimeout(this.#hoverAutoClose);
  }

  #unpauseToast() {
    this.#paused = false;
    this.#hoverAutoClose = setTimeout(() => {
      this.#remove();
    }, this.#visibleLeft);
  }

  #clearPauseOnHover() {
    this.#paused = false;
    this.#pausedAt = null;
    clearTimeout(this.#hoverAutoClose);
  }

  #visibilityChange() {
    if (document.visibilityState === "hidden") {
      this.#pauseToast();
    } else {
      this.#unpauseToast();
    }
  }
}
