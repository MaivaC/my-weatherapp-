
let h3 = document.querySelector("h3");
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
let day = days[now.getDay()];
h3.innerHTML = `${day} ${date},${hours}:${minutes}`;



function showTemperature(response) {
  console.log(response.data);
  let city = response.data.name;
  let cityName=document.querySelector("h2");
  cityName.innerHTML=`${city}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("form input");
  searchCity(input.value);
}

function searchCity(city) {
  let apiKey = "1b903b13fd4caf1f82d1ab59d8fe0b9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function getLocation(location) {
  console.log(location);
}

navigator.geolocation.getCurrentPosition(getLocation);



