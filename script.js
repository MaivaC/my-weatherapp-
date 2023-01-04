
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
 
  let temperatureElement = document.querySelector("#temperature");
   let cityName=document.querySelector("h2");
    let descriptionElement=document.querySelector("#description");
     let humidityElement=document.querySelector("#humidity");
     let windElement=document.querySelector("#wind");
     let dateElement=document.querySelector("#date");
      let iconElement=document.querySelector("#icon");
     
  let city = response.data.name;
 
  cityName.innerHTML=`${city}`;
  let temperature = Math.round(response.data.main.temp);
  
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML= response.data.weather[0].description;
   humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
   dateElement.innerHTML =formalDate(response.data.dt*1000);
   iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt",response.data.weather[0].description);
}




  let apiKey = "1b903b13fd4caf1f82d1ab59d8fe0b9f";
  let city="Paris";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);




