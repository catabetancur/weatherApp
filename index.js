function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();

  return `${currentDay}, ${currentHour}: ${currentMinute}`;
}

let now = new Date();
console.log(formatDate(now));

let dateElement = document.querySelector("#time");
dateElement.innerHTML = formatDate(now);

let cityweather = document.querySelector("#location-search");
cityweather.addEventListener("submit", searchfunction);

function celsiusConverter(event) {
  event.preventDefault();
  let nowTemperature = document.querySelector(".current-temperature");
  nowTemperature.innerHTML = 23;
}

function fahrenheitConverter(event) {
  event.preventDefault();
  let nowTemperature = document.querySelector(".current-temperature");
  nowTemperature.innerHTML = 55;
}

let celsiusTemperature = document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", celsiusConverter);

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", fahrenheitConverter);

function cityTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = `${temperature}`;

  let city = response.data.name;
  let currentCity = document.querySelector("#current-location");
  currentCity.innerHTML = `${city}`;

  let lowestTemperature = Math.round(response.data.main.temp_min);
  let minTemperature = document.querySelector(".min-temperature");
  minTemperature.innerHTML = `↓${lowestTemperature}`;

  let highestTemperature = Math.round(response.data.main.temp_max);
  let maxTemperature = document.querySelector(".max-temperature");
  maxTemperature.innerHTML = `↑${highestTemperature}`;

  let thermalSensation = Math.round(response.data.main.feels_like);
  let feelLike = document.querySelector(".feels-like");
  feelLike.innerHTML = `Feels like ${thermalSensation}`;
}

function searchfunction(city) {
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-Input").value;
  searchfunction(city);
}
let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("click", handleSubmit);

function showPosition(position) {
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
