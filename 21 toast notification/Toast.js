const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
  progressBar: true,
  pauseOnHover: true,
};

export class Toast {
  #pauseToastBound;
  #resetToastBound;

  #toastEl;

  #autoClose;
  #closeToastBound;

  #pausedAt;
  #visibleSince;
  #timeVisible;
  #visibleLeft;

  #paused = false;

  constructor(options) {
    this.#toastEl = document.createElement("div");
    this.#toastEl.classList.add("toast");
    this.#closeToastBound = this.#closeToast.bind(this);
    this.#pauseToastBound = this.#pauseToast.bind(this);
    this.#resetToastBound = this.#resetToast.bind(this);
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
    this.#timeVisible = value;
    this.#visibleSince = new Date();
    if (value === false) return;

    if (this.#autoClose) {
      clearTimeout(this.#autoClose);
    }
    this.#autoClose = setTimeout(() => this.remove(), value);
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
      this.#toastEl.removeEventListener("mouseenter", this.#pauseToastBound);
      this.#toastEl.removeEventListener("mouseout", this.#resetToastBound);
    }
  }

  set progressBar(value) {
    if (!value) return;
    this.#toastEl.classList.add("progress-bar");
    if (this.#timeVisible === false) return;
    window.requestAnimationFrame(this.#decreaseProgressBarWidth.bind(this));
  }

  get progressBarWidth() {
    return getComputedStyle(this.#toastEl).getPropertyValue("--progress-width");
  }

  set progressBarWidth(value) {
    this.#toastEl.style.setProperty("--progress-width", value);
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => (this[key] = value));
  }

  remove() {
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
      this.remove();
    }
  }

  #decreaseProgressBarWidth() {
    if (+this.progressBarWidth <= 0 || this.#paused === true) {
      return;
    }

    if (this.#pausedAt) {
      this.#visibleSince =
        Number(this.#visibleSince) + (new Date() - this.#pausedAt);
      this.#pausedAt = undefined;
    }

    const visibleFor = new Date().getTime() - Number(this.#visibleSince);
    this.#visibleLeft = this.#timeVisible - visibleFor;

    this.progressBarWidth = this.#visibleLeft / this.#timeVisible;
    window.requestAnimationFrame(this.#decreaseProgressBarWidth.bind(this));
  }

  #pauseToast() {
    this.#pausedAt = new Date();
    this.#paused = true;
    clearTimeout(this.#autoClose);
  }

  #resetToast() {
    this.#paused = false;
    this.#autoClose = setTimeout(() => {
      this.remove();
    }, this.#visibleLeft);
    window.requestAnimationFrame(this.#decreaseProgressBarWidth.bind(this));
  }
}
