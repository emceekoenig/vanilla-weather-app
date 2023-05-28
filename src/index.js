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
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = `${hours}:${minutes}`;

let todaysDate = `${day} ${time}`;

let dateandtime = document.querySelector("#dateandtime");
dateandtime.innerHTML = todaysDate;

// Feature #2: add a search engine, when searching for a city display the city name on the page after user submits the form

function showTemperature(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#first-hi").innerHTML =
    response.data.list[0].main.temp_max;
  document.querySelector("#first-lo").innerHTML =
    response.data.list[0].main.temp_min;
  document.querySelector("#second-hi").innerHTML =
    response.data.list[1].main.temp_max;
  document.querySelector("#second-lo").innerHTML =
    response.data.list[1].main.temp_min;
  document.querySelector("#third-hi").innerHTML =
    response.data.list[2].main.temp_max;
  document.querySelector("#third-lo").innerHTML =
    response.data.list[2].main.temp_min;
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

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function searchForecast(position) {
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentForecast(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchForecast);
}

searchCity("New York");

// 🙀Bonus Feature: Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function celsiusFormat(event) {
  event.preventDefault();
  let cTemp = document.querySelector("#celsius-link");
  cTemp.innerHTML = celsius;
}

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", celsiusFormat);

function fahrenheitFormat(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temp").innerHTML;
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let fahrenheitTemp = document.querySelector("#temp");
  fahrenheitTemp.innerHTML = fahrenheit;
}

let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", fahrenheitFormat);
