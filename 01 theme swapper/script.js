const btnToggle = document.querySelector(".theme-toggle-btn");
const sunAndMoon = document.querySelector(".sun-and-moon-container");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

btnToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  const rotation = getComputedStyle(sunAndMoon).getPropertyValue("--rotation");

  let rotationValue = parseInt(rotation);
  rotationValue += 180;

  sunAndMoon.style.setProperty("--rotation", rotationValue + "deg");
});

btnToggle.addEventListener("mouseout", function () {
  btnToggle.blur();
});
