// selecting elements
const numberOfCharsSlider = document.getElementById("slider");
const numberOfCharsInput = document.getElementById("number-of-characters");
const generatePasswordButton = document.querySelector(".btn");
const includeUpperCase = document.getElementById("include-uppercase");
const includeNumbers = document.getElementById("include-numbers");
const includeSymbols = document.getElementById("include-symbols");
const passwordCont = document.querySelector("h2");

// char codes arrays
const UPPER_CASE = rangeOfCharCodes(65, 90);
const LOWER_CASE = rangeOfCharCodes(97, 122);
const NUMBERS = rangeOfCharCodes(48, 57);
const SPECIAL_CHARS = rangeOfCharCodes(32, 47)
  .concat(rangeOfCharCodes(58, 64))
  .concat(rangeOfCharCodes(91, 96))
  .concat(rangeOfCharCodes(123, 126));

// sync slider with input
numberOfCharsInput.addEventListener("input", synchronizeSliderAndInput);
numberOfCharsSlider.addEventListener("input", synchronizeSliderAndInput);

// generate password button event
generatePasswordButton.addEventListener("click", function (e) {
  e.preventDefault();
  generatePassword(
    numberOfCharsInput.value,
    includeUpperCase.checked,
    includeNumbers.checked,
    includeSymbols.checked
  );
});

// sync slider and input amount
function synchronizeSliderAndInput() {
  const value = this.value;
  numberOfCharsInput.value = value;
  numberOfCharsSlider.value = value;
}

// generates and displays password
function generatePassword(charNumber, upperCase, numbers, symbols) {
  if (charNumber > 40) return;

  let charCodes = LOWER_CASE;

  if (upperCase) charCodes = charCodes.concat(UPPER_CASE);
  if (numbers) charCodes = charCodes.concat(NUMBERS);
  if (symbols) charCodes = charCodes.concat(SPECIAL_CHARS);

  const generatedPasswordArray = [];
  const charCodesLength = charCodes.length;

  for (let i = 0; i < charNumber; i++) {
    const charCode = charCodes[Math.floor(Math.random() * charCodesLength)];
    generatedPasswordArray.push(String.fromCharCode(charCode));
  }

  const generatedPasswordString = generatedPasswordArray.join("");
  passwordCont.textContent = generatedPasswordString;
}

// returns array of char codes
function rangeOfCharCodes(min, max) {
  const charCodesArray = [];
  for (let i = min; i <= max; i++) {
    charCodesArray.push(i);
  }
  return charCodesArray;
}
