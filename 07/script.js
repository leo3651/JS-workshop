const strenthBarElement = document.getElementById("strength-bar");
const inputElement = document.getElementById("password-input");
const reasonsContainerElement = document.getElementById("reasons");

inputElement.addEventListener("input", updateState);

function updateState() {
  const weaknesses = calcPasswordStrength(inputElement.value);
  let strength = 100;

  reasonsContainerElement.innerHTML = "";
  weaknesses.forEach((weakness) => {
    // if exists
    if (!weakness) return;

    // decrease strength
    strength -= weakness.negativePoints;

    // render new messages
    const newMessage = document.createElement("div");
    newMessage.textContent = weakness.message;
    reasonsContainerElement.appendChild(newMessage);
  });

  // update strength bar
  strenthBarElement.style.setProperty("--strength-width", strength);
}

function calcPasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeaknesses(password));
  weaknesses.push(lowerCaseWeakness(password));
  weaknesses.push(upperCaseWeakness(password));
  weaknesses.push(numberWeakness(password));

  return weaknesses;
}

function lengthWeaknesses(password) {
  if (password.length <= 5)
    return {
      message: "Password too short",
      negativePoints: 40,
    };
  if (password.length <= 10)
    return {
      message: "Password could be longer",
      negativePoints: 15,
    };
}

function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || [];
  const length = matches.length;

  if (length === 0)
    return {
      message: `No ${type}`,
      negativePoints: 30,
    };
  if (length <= 2)
    return {
      message: `Too little ${type}`,
      negativePoints: 20,
    };
  if (length <= 4)
    return {
      message: `Could have more ${type}`,
      negativePoints: 10,
    };
}

function upperCaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, "upper case characters");
}

function lowerCaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, "lower case characters");
}

function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, "numbers");
}

let timer;

function logOut() {
  timer = setInterval(() => console.log(new Date()), 4000);
  return timer;
}
timer = logOut();
console.log(timer);
clearInterval(timer);
console.log(timer);
console.log(Boolean(timer));
