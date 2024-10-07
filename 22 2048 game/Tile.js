export class Tile {
  #tileElement;
  #x;
  #y;
  #value;

  constructor(gridEl) {
    this.#tileElement = document.createElement("div");
    this.#tileElement.classList.add("tile");
    gridEl.append(this.#tileElement);
    this.value = Math.random() > 0.5 ? 2 : 4;
  }

  set value(val) {
    this.#value = val;
    this.#tileElement.textContent = val;

    const power = Math.log2(val);
    const backgroundLightness = 100 - power * 9;

    this.#tileElement.style.setProperty("--lightness", backgroundLightness);
    this.#tileElement.style.setProperty(
      "--text-lightness",
      backgroundLightness <= 50 ? 90 : 10
    );
  }

  set x(value) {
    this.#x = value;
    this.#tileElement.style.setProperty("--x", value);
  }

  set y(value) {
    this.#y = value;
    this.#tileElement.style.setProperty("--y", value);
  }

  get value() {
    return this.#value;
  }

  remove() {
    this.#tileElement.remove();
  }

  waitForTransitionEnd(event) {
    return new Promise((resolve) => {
      this.#tileElement.addEventListener(event, resolve, {
        once: true,
      });
    });
  }
}
