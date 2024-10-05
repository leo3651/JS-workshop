const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
};

export class Toast {
  #toastEl;
  #autoCloseTimeout;

  constructor(options) {
    this.#toastEl = document.createElement("div");
    this.#toastEl.classList.add("toast");
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }

  set position(value) {
    console.log(value);
    const selector = `.toast-container[data-position=${value}]`;
    const container =
      document.querySelector(selector) || this.createCont(value);
    container.append(this.#toastEl);
  }

  set text(value) {
    this.#toastEl.textContent = value;
  }

  set autoClose(value) {
    if (value === false) return;
    if (this.#autoCloseTimeout) clearTimeout(this.#autoCloseTimeout);

    this.#autoCloseTimeout = setTimeout(() => this.remove(), value);
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => (this[key] = value));
  }

  remove() {
    const toastContainer = this.#toastEl.parentElement;
    this.#toastEl.remove();
    if (!toastContainer.hasChildNodes()) {
      toastContainer.remove();
    }
  }

  show() {
    const toast = document.createElement("div");
    toast.classList;
  }

  createCont(value) {
    const container = document.createElement("div");
    container.classList.add("toast-container");
    container.dataset.position = value;
    document.body.append(container);
    return container;
  }
}
