//variables
var citySearchEl = document.querySelector('#city-search')
var submitButton = document.querySelector("#button")
var weatherEl = document.querySelector("#weather-display")
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
    const currentUv = document.createElement('p')
    //grab data and inserting to elements
    currentTemp.innerHTML = "Temperature: " + info.main.temp
    currentHumidity.innerHTML = "Humidity: " + info.main.humidity
    currentWind.innerHTML = "Wind Speed is " + info.wind.speed
    
    //append to weather display
    weatherEl.appendChild(currentTemp)
    weatherEl.appendChild(currentHumidity)
    weatherEl.appendChild(currentWind)

}
fetchCurrentWeather();

// event listeners
$(document).ready(function() {
    $("button").click(function(event) {
        formSearch();
        event.preventDefault();
    });
});
