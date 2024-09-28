export default class Select {
  constructor(element) {
    this.customElement = document.createElement("div");
    this.labelElement = document.createElement("span");
    this.optionsElement = document.createElement("ul");
    this.options = this.#getFormattedOptions(
      element.querySelectorAll("option")
    );
    this.#setupCustomElement();
    element.after(this.customElement);
    element.style.display = "none";
    this.customElement.tabIndex = 0;
    this.#displayOptionsToggle();
    this.#hideOptionsOnOverlayClick();
    this.#addOptionsEventListener();
    this.#addOptionsKeyboardActions();
  }

  #setupCustomElement() {
    this.customElement.classList.add("custom-select-container");
    this.labelElement.classList.add("custom-select-label");
    this.optionsElement.classList.add("custom-select-options");
    this.customElement.append(this.labelElement);
    this.customElement.append(this.optionsElement);
    this.labelElement.innerText = this.selectedOption.label;
    this.options.forEach((option) => {
      const li = document.createElement("li");
      li.classList.add("custom-select-option");
      li.classList.toggle("selected", option.selected);
      li.dataset.value = option.value;
      li.innerText = option.label;
      this.optionsElement.append(li);
    });
  }

  get selectedOption() {
    return this.options.find((opt) => opt.selected);
  }

  get indexOfSelectedOption() {
    return this.options.indexOf(this.selectedOption);
  }

  #setSelectedOption(value) {
    if (!value) return;
    const prevSelected = this.selectedOption;
    prevSelected.selected = false;
    prevSelected.optionElement.selected = false;

    const newlySelected = this.options.find((opt) => opt.value === value);
    newlySelected.selected = true;
    newlySelected.optionElement.selected = true;

    this.labelElement.innerText = newlySelected.label;
    this.#applyClassesAfterSelectionChange(prevSelected, newlySelected);
  }

  #getFormattedOptions(optionElements) {
    return [...optionElements].map((option) => ({
      value: option.value,
      label: option.label,
      selected: option.selected,
      optionElement: option,
    }));
  }

  #applyClassesAfterSelectionChange(prevSelected, newlySelected) {
    this.optionsElement
      .querySelector(`[data-value="${prevSelected.value}"]`)
      .classList.remove("selected");
    const newSelectedElement = this.optionsElement.querySelector(
      `[data-value="${newlySelected.value}"]`
    );
    newSelectedElement.classList.add("selected");
    newSelectedElement.scrollIntoView({ block: "nearest" });
  }

  #displayOptionsToggle() {
    this.labelElement.addEventListener("click", (e) => {
      this.optionsElement.classList.toggle("show");
    });
  }

  #hideOptionsOnOverlayClick() {
    this.customElement.addEventListener(
      "blur",
      this.#hideOptionsElement.bind(this)
    );
  }

  #hideOptionsElement() {
    this.optionsElement.classList.remove("show");
  }

  #addOptionsEventListener() {
    this.optionsElement.addEventListener("click", (e) => {
      const li = e.target.closest(".custom-select-option");
      if (!li) return;
      this.optionsElement.classList.toggle("show");
      this.#setSelectedOption(li.dataset.value);
    });
  }

  debounceTimeout;
  searchTerm = "";
  #addOptionsKeyboardActions() {
    this.customElement.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "Space":
          this.optionsElement.classList.toggle("show");
          break;

        case "ArrowUp":
          this.#setSelectedOption(
            this.options[this.indexOfSelectedOption - 1]?.value
          );
          break;

        case "ArrowDown":
          this.#setSelectedOption(
            this.options[this.indexOfSelectedOption + 1]?.value
          );
          break;

        case "Enter":
        case "Escape":
          this.optionsElement.classList.remove("show");
          break;

        default:
          this.searchTerm += e.key;
          clearTimeout(this.debounceTimeout);
          this.debounceTimeout = setTimeout(() => {
            this.searchTerm = "";
          }, 1000);

          const searchedOption = this.options.find((opt) =>
            opt.label.toLowerCase().startsWith(this.searchTerm)
          );
          this.#setSelectedOption(searchedOption?.value);
          break;
      }
    });
  }
}
