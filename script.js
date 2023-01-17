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
let days = ["SUN","MON","TUES","WeD","THURS","FRI","SAT"];
let day = days[now.getDay()];
h3.innerHTML = `${day} ${date},${hours}:${minutes}`;

function formatDay(timestamp){
let date=new Date(timestamp*1000);
let day= date.getDay();
let days=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
return days[day];
}

function displayForecast(response){
let forecast=response.data.daily;

let forecastElement=document.querySelector("#forecast");

  let forecastHTML=`<div class="row">`;
forecast.forEach(function (forecastDay,index){
  if (index<6){
  forecastHTML=forecastHTML+` <div class="col-2">
 <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}04n@2x.png" alt="" />
 <div class="weather-forecast-temperatures">
 <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
   <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>

    </div>
</div>`;}
 });

                                     forecastHTML=forecastHTML+`</div>`;
   forecastElement.innerHTML=forecastHTML;
 

}



function showTemperature(response) {

  let temperatureElement = document.querySelector("#temperature");
  let cityName = document.querySelector("h2");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsuisTempertaure = response.data.main.temp;



  let city = response.data.name;
  cityName.innerHTML = `${city}`;
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.cord);
}
function  getForecast(coordinates){
  let apiKey="1b903b13fd4caf1f82d1ab59d8fe0b9f";
  let apiUrl=`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function search(city) {
  let apiKey = "1b903b13fd4caf1f82d1ab59d8fe0b9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahenreitTemperature(event) {
  event.preventdefault();
  let fahenreitTemperature = (celsuisTempertaure * 9) / 5 + 32;
  //remove the active class from celsuis link
  celsuisLink.classList.remove("active");
  fahenreitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahenreitTemperature);
  alert("link clicked");
}

function displayCelsuisTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //add the active class from celsuis link
  celsuisLink.classList.add("active");
  fahenreitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsuisTemperature);
}

let celsuisTempertaure = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let fahenreitLink = document.querySelector("#Fahenreit-link");
fahenreitLink.addEventListener("click", displayFahenreitTemperature);

let celsuisLink = document.querySelector("#celsuis-link");
celsuisLink.addEventListener("click", displayCelsuisTemperature);

search("Paris");

