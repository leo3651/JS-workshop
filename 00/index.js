"use strict";

const inputNameEl = document.getElementById("name");
const inputPasswordEl = document.getElementById("password");
const formEl = document.getElementById("form");
const errorEl = document.getElementById("error");

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  const password = inputPasswordEl.value;
  const name = inputNameEl.value;
  let messages = [];

  const specialSymbols = ["!", "&", "+", "-", "*", "/", ".", ",", "$", "#"];

  if (!name) messages.push("name is required");
  if (password.length < 6 || password.length > 20)
    messages.push("password must be between 6 and 20 characters long");
  if (!password.includes(specialSymbols))
    messages.push("password must contain at least one special character");

  if (messages.length > 0) {
    let firstError = messages[0];
    firstError = firstError.replace(firstError[0], firstError[0].toUpperCase());
    messages[0] = firstError;
    errorEl.textContent = messages.join(", ");
  }
});
