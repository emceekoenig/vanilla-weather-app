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

let todaysDate = `${day} ${time}`;

let dateandtime = document.querySelector("#date-and-time");
dateandtime.innerHTML = todaysDate;

// Feature #2: add a search engine, when searching for a city display the city name on the page after user submits the form

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
}

function searchCity(city) {
  let units = "metric";
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
  let units = "metric";
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

function displayForecast(position) {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row forecast-row">`;
  let days = ["Wed", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png" alt="" class="weather-icon"></>
          
        <div class="weather-forecast-temperatures">
        <strong id="first-hi">80°</strong id="first-lo">/58°</div>
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getCurrentForecast(coordinates) {
  let units = "metric";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  console.log(apiUrl);
  console.log("Hello world");
}

// 🙀Bonus Feature: Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temp");
  let fahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  fahrenheitTemp.innerHTML = fahrenheit;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#temp");
  celsiusTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", displayFahrenheitTemperature);

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");

displayForecast();
