import { ICON_MAP } from "./iconMap";
import { getWeather } from "./weather";

const currentIcon = document.querySelector("[data-current-icon]");
const daySection = document.querySelector(".day-section");
const dayCardTemplate = document.querySelector(".day-card-template");

getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone)
  .then(renderWeather)
  .catch((err) => console.error(err));

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current);
  renderDailyWeather(daily);
  renderHourlyWeather(hourly);
  document.body.classList.remove("blurred");
}

function renderCurrentWeather(current) {
  currentIcon.src = getIconURL(current.iconCode);
  setValue("current-temp", current.currentTemp);
  setValue("current-high", current.maxTemp);
  setValue("current-fl-high", current.highFeelsLike);
  setValue("current-low", current.minTemp);
  setValue("current-wind", current.windSpeed);
  setValue("current-fl-low", current.lowFeelsLike);
  setValue("current-precip", current.precip);
}

function renderDailyWeather(daily) {
  daySection.innerHTML = "";
  daily.forEach((day) => {
    const element = dayCardTemplate.content.cloneNode(true);
    setValue("day", new Date(day.timestamp).getDay(), { parent: element });
    setValue("temp", day.averageTemp, { parent: element });
    element.querySelector("[data-icon]").src = getIconURL(day.iconCode);
    daySection.appendChild(element);
  });
}

function renderHourlyWeather(hourly) {}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconURL(iconCode) {
  return `./${ICON_MAP.get(iconCode)}.svg`;
}
