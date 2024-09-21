import { ICON_MAP } from "./iconMap";
import { getWeather } from "./weather";

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

function positionSuccess({ coords }) {
  getWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    .then(renderWeather)
    .catch((err) => console.error(err));
}

function positionError() {
  alert("Error getting location");
}

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current);
  renderDailyWeather(daily);
  renderHourlyWeather(hourly);
  document.body.classList.remove("blurred");
}

const currentIcon = document.querySelector("[data-current-icon]");

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

const daySection = document.querySelector(".day-section");
const dayCardTemplate = document.querySelector(".day-card-template");
const dayFormatter = new Intl.DateTimeFormat(undefined, { weekday: "long" });

function renderDailyWeather(daily) {
  daySection.innerHTML = "";
  daily.forEach((day) => {
    const element = dayCardTemplate.content.cloneNode(true);
    setValue("day", dayFormatter.format(day.timestamp), { parent: element });
    setValue("temp", day.averageTemp, { parent: element });
    element.querySelector("[data-icon]").src = getIconURL(day.iconCode);
    daySection.append(element);
  });
}

const hourSection = document.querySelector(".hour-table");
const hourRowTemplate = document.querySelector(".hour-row-template");
const hourFormatter = new Intl.DateTimeFormat(undefined, { hour: "numeric" });

function renderHourlyWeather(hourly) {
  hourSection.innerHTML = "";
  hourly.forEach((hour) => {
    const element = hourRowTemplate.content.cloneNode(true);
    setValue("time", hourFormatter.format(hour.timestamp), { parent: element });
    setValue("day", dayFormatter.format(hour.timestamp), { parent: element });
    setValue("temp", hour.temperature, { parent: element });
    setValue("fl-temp", hour.feelsLike, { parent: element });
    setValue("wind", hour.windSpeed, { parent: element });
    setValue("precip", hour.precip, { parent: element });
    element.querySelector("[data-icon]").src = getIconURL(hour.iconCode);
    hourSection.append(element);
  });
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconURL(iconCode) {
  return `./${ICON_MAP.get(iconCode)}.svg`;
}
