import axios from "axios";

export function getWeather(latitude, longitude, timezone) {
  return axios
    .get(
      "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime",
      {
        params: {
          latitude,
          longitude,
          timezone,
        },
      }
    )
    .then(({ data }) => {
      console.log(data);
      return {
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data),
      };
    });
}

function parseCurrentWeather({ current_weather, daily }) {
  const {
    temperature: currentTemp,
    windspeed: windSpeed,
    weathercode: iconCode,
  } = current_weather;

  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [highFeelsLike],
    apparent_temperature_min: [lowFeelsLike],
    precipitation_sum: [precip],
  } = daily;

  return {
    currentTemp: Math.round(currentTemp),
    maxTemp: Math.round(maxTemp),
    minTemp: Math.round(minTemp),
    highFeelsLike: Math.round(highFeelsLike),
    lowFeelsLike: Math.round(lowFeelsLike),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 1000) / 1000,
    iconCode,
  };
}

function parseDailyWeather({ daily }) {
  const {
    temperature_2m_max: maxTemp,
    temperature_2m_min: minTemp,
    weathercode: weatherCode,
  } = daily;

  return daily.time.map((time, i) => ({
    timestamp: time * 1000,
    iconCode: weatherCode[i],
    averageTemp: Math.round((maxTemp[i] + minTemp[i]) / 2),
  }));
}

function parseHourlyWeather({ hourly, current_weather }) {
  return hourly.time
    .map((time, i) => ({
      timestamp: time * 1000,
      temperature: Math.round(hourly.temperature_2m[i]),
      iconCode: hourly.weathercode[i],
      windSpeed: Math.round(hourly.windspeed_10m[i]),
      precip: Math.round(hourly.precipitation[i] * 1000) / 1000,
      feelsLike: Math.round(hourly.apparent_temperature[i]),
    }))
    .filter(({ timestamp }) => timestamp >= current_weather.time * 1000);
}
