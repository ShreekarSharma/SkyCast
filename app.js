const apiKey = `6b6489c285d34f05d5010267af550065`;
const elements = {
  nameInput: document.querySelector(`#name-input`),
  button: document.querySelector(`.btn`),
  cityName: document.querySelector(`#city-name`),
  temperatureValue: document.querySelector(`#temperature-value`),
  humidityValue: document.querySelector(`#humidity-value`),
  windspeedValue: document.querySelector(`#wind-speed-value`),
  weatherdescriptionValue: document.querySelector(`#weather-description-value`),
  weatherSection: document.querySelector(`#weather-section`)
};
let city = `Mumbai`;
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
elements.button.addEventListener(`click`, (e) => {
  e.preventDefault();
  const enteredCity = elements.nameInput.value.trim();
  if (enteredCity === ``) {
    alert(`Enter a city name`);
  } else {
    fetchData(enteredCity);
  }
});
function fetchData(city) {
  apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      updateWeatherData(data);
      elements.weatherSection.classList.remove(`hidden`);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
function updateWeatherData(data){
  elements.cityName.innerText = `${data.name}, ${data.sys.country}`;
  elements.temperatureValue.innerText = Math.round(data.main.temp - 273.15);
  elements.humidityValue.innerText = data.main.humidity;
  elements.windspeedValue.innerText = (data.wind.speed * 3.6).toFixed(2);
  elements.weatherdescriptionValue.innerText = data.weather[0].description;
}
fetchData(city);
