class Calculator {
  constructor(previousOperandEl, currentOperandEl) {
    this.previousOperandEl = previousOperandEl;
    this.currentOperandEl = currentOperandEl;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (
      number.toString() === "." &&
      this.currentOperand.toString().includes(".")
    ) {
      return;
    }
    this.currentOperand += number;
  }

  chooseOperation(operation) {
    if (this.currentOperand.toString() === "") return;
    if (this.currentOperand.toString() !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    if (
      isNaN(Number.parseFloat(this.previousOperand)) ||
      isNaN(Number.parseFloat(this.currentOperand))
    )
      return;

    let result;

    if (this.operation === "*") {
      result =
        Number.parseFloat(this.currentOperand) *
        Number.parseFloat(this.previousOperand);
    }
    if (this.operation === "÷") {
      result =
        Number.parseFloat(this.previousOperand) /
        Number.parseFloat(this.currentOperand);
    }
    if (this.operation === "+") {
      result =
        Number.parseFloat(this.previousOperand) +
        Number.parseFloat(this.currentOperand);
    }
    if (this.operation === "-") {
      result =
        Number.parseFloat(this.previousOperand) -
        Number.parseFloat(this.currentOperand);
    }

    this.currentOperand = result;
    this.previousOperand = "";
    this.operation = undefined;
  }

  display() {
    if (this.operation) {
      this.previousOperandEl.textContent =
        this.formatNumber(this.previousOperand) + " " + this.operation;
    } else {
      this.previousOperandEl.textContent = this.previousOperand;
    }
    this.currentOperandEl.textContent = this.formatNumber(this.currentOperand);
  }

  formatNumber(number) {
    let [integerDigits, decimalDigits] = number.toString().split(".");
    integerDigits = Number.parseFloat(integerDigits);

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
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

  const key = Object.keys(e.target.dataset)[0];

  switch (key) {
    case "number":
      calc.appendNumber(e.target.textContent);
      break;

    case "operation":
      calc.chooseOperation(e.target.textContent);
      break;

    case "allClear":
      calc.clearAll();
      break;

    case "equals":
      calc.compute();
      break;

    case "delete":
      calc.delete();
      break;

    default:
      break;
  }

  calc.display();
});
