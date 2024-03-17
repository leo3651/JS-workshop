const numberOfCharsSlider = document.getElementById("slider");
const numberOfCharsInput = document.getElementById("number-of-characters");
const generatePasswordButton = document.querySelector(".btn");
const includeUpperCase = document.getElementById("include-uppercase");
const includeNumbers = document.getElementById("include-numbers");
const includeSymbols = document.getElementById("include-symbols");

const UPPER_CASE = rangeOfChars(65, 90);
const LOWER_CASE = rangeOfChars(97, 122);
const NUMBERS = rangeOfChars(48, 57);
const SPECIAL_CHARS = rangeOfChars(32, 47)
  .concat(rangeOfChars(58, 64))
  .concat(rangeOfChars(91, 96))
  .concat(rangeOfChars(123, 126));

numberOfCharsInput.addEventListener("input", synchronizeSliderAndInput);
numberOfCharsSlider.addEventListener("input", synchronizeSliderAndInput);

generatePasswordButton.addEventListener("click", function (e) {
  e.preventDefault();
  generatePassword(
    numberOfCharsInput.value,
    includeUpperCase.checked,
    includeNumbers.checked,
    includeSymbols.checked
  );
});

function synchronizeSliderAndInput() {
  const value = this.value;
  numberOfCharsInput.value = value;
  numberOfCharsSlider.value = value;
}

function generatePassword(charNumber, upperCase, numbers, symbols) {
  console.log(charNumber, upperCase, numbers, symbols);
}

function rangeOfChars(min, max) {
  const rangeArray = [];
  for (let i = min; i <= max; i++) {
    rangeArray.push(i);
  }
  return rangeArray;
}
