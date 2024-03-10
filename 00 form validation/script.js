"use strict";

const inputNameEl = document.getElementById("name");
const inputPasswordEl = document.getElementById("password");
const formEl = document.getElementById("form");
const errorEl = document.getElementById("error");

const specialSymbols = ["!", "&", "+", "-", "*", "/", ".", ",", "$", "#"];

// submit event handler
formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  let messages = [];
  const password = inputPasswordEl.value;
  const firstName = inputNameEl.value;

  // checks if name and password valid
  if (!firstName) messages.push("name is required");
  if (password.length < 6 || password.length > 20)
    messages.push("password must be between 6 and 20 characters long");
  if (
    !password
      .split("")
      .some((passwordChar) => specialSymbols.includes(passwordChar))
  )
    messages.push("password must contain at least one special character");

  // displays message
  if (messages.length > 0) {
    let firstError = messages[0];
    firstError = firstError.replace(firstError[0], firstError[0].toUpperCase());
    messages[0] = firstError;
    errorEl.textContent = messages.join(", ");
  } else {
    errorEl.textContent = "You signed up successfully";
  }

  // restores input, password, bottom
  inputNameEl.value = inputPasswordEl.value = "";
  inputPasswordEl.style.borderBottom = "solid 3px transparent";
  inputNameEl.style.borderBottom = "solid 3px transparent";
});

// if name is ok green bottom else red
inputNameEl.addEventListener("input", function (e) {
  const firstName = inputNameEl.value;
  errorEl.textContent = "";

  inputNameEl.style.borderBottom = firstName
    ? "solid 3px green"
    : "solid 3px orangered";
});

// if password is ok green bottom else red
inputPasswordEl.addEventListener("input", function (e) {
  const password = inputPasswordEl.value;

  if (
    password.length >= 6 &&
    password.length <= 20 &&
    password
      .split("")
      .some((passwordChar) => specialSymbols.includes(passwordChar))
  ) {
    inputPasswordEl.style.borderBottom = "solid 3px green";
  } else {
    inputPasswordEl.style.borderBottom = "solid 3px orangered";
  }
});

// clear error if typing
window.addEventListener("input", function () {
  errorEl.textContent = "";
});
