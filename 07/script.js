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
