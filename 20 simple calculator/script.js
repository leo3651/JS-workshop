class Calculator {
  constructor(previousOperandEl, currentOperandEl) {
    this.previousOperandEl = previousOperandEl;
    this.currentOperandEl = currentOperandEl;
    this.clearAll();
  }

  clearAll() {
    this.previousOperandEl.textContent = "";
    this.currentOperandEl.textContent = "";
  }

  delete() {
    this.currentOperandEl.textContent = this.currentOperandEl.textContent.slice(
      0,
      -1
    );
  }

  appendNumber(val) {
    this.currentOperandEl.textContent += val;
  }

  chooseOperation(operation) {
    this.previousOperandEl.textContent = this.currentOperandEl.textContent;
    this.currentOperandEl.textContent = operation;
  }

  compute() {}

  display() {}
}

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equals]");
const previousOperandEl = document.querySelector("[data-previous-operand]");
const currentOperandEl = document.querySelector("[data-current-operand]");

const calc = new Calculator(previousOperandEl, currentOperandEl);

document.body.addEventListener("click", (e) => {
  if (
    !e.target.closest("[data-number]") &&
    !e.target.closest("[data-operation]") &&
    !e.target.closest("[data-equals]") &&
    !e.target.closest("[data-all-clear]") &&
    !e.target.closest("[data-delete]")
  ) {
    return;
  }

  if (e.target.dataset.number) {
    calc.appendNumber(e.target.textContent);
  }
  if (e.target.dataset.delete) {
    calc.delete();
  }
  if (e.target.dataset.operation) {
  }
  if (e.target.dataset.allClear) {
    calc.clearAll();
  }
  if (e.target.dataset.equals) {
    calc.compute();
  }
});
