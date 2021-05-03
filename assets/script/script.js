//variables
var citySearchEl = document.querySelector('#city-search')
var submitButton = document.querySelector("#button")
var weatherEl = document.querySelector("#weather-display")
var forecastEl = document.querySelector("#weather-forecast")
var currentDate = moment().format("MM/DD/YYYY")
var userSearch = ""
var apiKey = "d0077aed95867e04393883a9e7a5d3f5"

function formSearch(event) {
    var userSearch = citySearchEl.value.trim();
    var userSearch = userSearch.toUpperCase();
    console.log(userSearch)
    fetchCurrentWeather(userSearch)
}

function fetchCurrentWeather(city){
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(url).then(function(response){
        //check if a city was entered
        if (response.ok) {
            response.json().then(function(data){
                console.log(data)
                createCurrentWeather(data)
                futureForecast(data)
            })
        } else {
            alert("Plese enter a city.")
        }
    }) 

}
function createCurrentWeather(info) {
    //create elements
    const currentTemp = document.createElement('h3')
    const currentHumidity = document.createElement('p')
    const currentWind = document.createElement('p')
    const currentIcon = document.createElement('img')
    //grab data and inserting to elements
    currentTemp.innerHTML = "Temperature: " + info.main.temp + " ° Farenheit"
    currentHumidity.innerHTML = "Humidity: " + info.main.humidity + '%'
    currentWind.innerHTML = "Wind Speed is " + info.wind.speed + " miles per hour"
    //icon creation
    var iconUrl = "http://openweathermap.org/img/w/" + info.weather[0].icon + ".png"
    currentIcon.setAttribute('src', iconUrl)
    //append to weather display
    weatherEl.appendChild(currentTemp)
    weatherEl.appendChild(currentHumidity)
    weatherEl.appendChild(currentWind)
    weatherEl.appendChild(currentIcon)

}

function futureForecast(forecast) {
    for (var i=1;i<7;i++) {
        var newUnixDate = moment.unix(forecast.daily[i].dt)
        newUnixDate = newUnixDate._d.toLocaleDateString();

        const forecastTemp = document.createElement('h3')
        const forecastHumidity = document.createElement('p')
        const forecastWind = document.createElement('p')
        const forecastIcon = document.createElement('img')
        //grab data and inserting to elements
        forecastTemp.innerHTML = "Temperature: " + forecast.daily[i].main.temp + " ° Farenheit"
        forecastHumidity.innerHTML = "Humidity: " +  forecast.daily[i].main.humidity + '%'
        forecastWind.innerHTML = "Wind Speed is " +  forecast.daily[i].wind.speed + " miles per hour"
        //icon creation
        var forecastIconUrl = "http://openweathermap.org/img/w/" + forecast.daily[i].weather[0].icon + ".png"
        forecastIcon.setAttribute('src', forecastIconUrl)
        //append to weather display
        forecastEl.appendChild(forecastTemp)
        forecastEl.appendChild(forecastHumidity)
        forecastEl.appendChild(forecastWind)
        forecastEl.appendChild(forecastIcon)
    }
}
fetchCurrentWeather();

// event listeners
$(document).ready(function() {
    $("button").click(function(event) {
        formSearch();
        event.preventDefault();
    });
});
