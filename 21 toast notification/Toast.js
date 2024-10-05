const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
};

export class Toast {
  #toastEl;
  #autoCloseTimeout;
  #canCloseListener;

  constructor(options) {
    this.#toastEl = document.createElement("div");
    this.#toastEl.classList.add("toast");
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
    if (value === false) return;
    if (this.#autoCloseTimeout) clearTimeout(this.#autoCloseTimeout);

    this.#autoCloseTimeout = setTimeout(() => this.remove(), value);
  }

  set canClose(value) {
    this.#toastEl.classList.toggle("can-close", value);
    if (value) {
      this.#canCloseListener = this.#toastEl.addEventListener(
        "click",
        this.#closeToast.bind(this)
      );
    }
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => (this[key] = value));
  }

  remove() {
    const toastContainer = this.#toastEl.parentElement;
    this.#toastEl.remove();
    this.onClose();
    if (!toastContainer.hasChildNodes()) {
      toastContainer.remove();
    }
    if (this.#canCloseListener) {
      this.#toastEl.removeEventListener("click", this.#canCloseListener);
    }
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
}
