// Feature #1: display the current date and time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hours = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = `${hours}:${minutes}`;

function standardTime() {
  let hours = now.getHours();
  if (hours > 12) return `${hours - 12}:${minutes} PM`;
  else return `${hours}:${minutes} AM`;
}

let todaysDate = `${day} ${standardTime(time)}`;

let dateandtime = document.querySelector("#date-and-time");
dateandtime.innerHTML = todaysDate;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row forecast-row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" class="weather-icon"></>
          
        <div class="weather-forecast-temperatures">
        <strong id="first-hi">${Math.round(
          forecastDay.temp.max
        )}°</strong id="first-lo">/${Math.round(forecastDay.temp.min)}°</div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getCurrentForecast(coordinates) {
  let units = "imperial";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].main);

  getCurrentForecast(response.data.coord);
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let units = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-arrow");
currentLocationButton.addEventListener("click", getCurrentLocation);

// 🙀Bonus Feature: Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temp");
  let fahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  fahrenheitTemp.innerHTML = fahrenheit;
}

function changeTheme() {
  let body = document.querySelector("body");
  let paragraphElement = document.querySelector("p");
  let containerElement = document.querySelector(".container");
  let cardElement = document.querySelector(".card");
  let detailsElement = document.querySelector(".details");
  let forecastRow = document.querySelector("#weather-forecast");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }

  if (paragraphElement.classList.contains("dark")) {
    paragraphElement.classList.remove("dark");
  } else {
    paragraphElement.classList.add("dark");
  }

  if (containerElement.classList.contains("dark")) {
    containerElement.classList.remove("dark");
  } else {
    containerElement.classList.add("dark");
  }

  if (cardElement.classList.contains("dark")) {
    cardElement.classList.remove("dark");
  } else {
    cardElement.classList.add("dark");
  }

  if (detailsElement.classList.contains("dark")) {
    detailsElement.classList.remove("dark");
  } else {
    detailsElement.classList.add("dark");
  }

  if (forecastRow.classList.contains("dark")) {
    forecastRow.classList.remove("dark");
  } else {
    forecastRow.classList.add("dark");
  }
}

let themeButton = document.querySelector(".theme");
themeButton.addEventListener("click", changeTheme);

searchCity("New York");
