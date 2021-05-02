//variables
var citySearchEl = document.querySelector('#city-search')
var submitButton = document.querySelector("#button")
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
    fetch(url).then(response => response.json()).then(data => console.log(data))

}

fetchCurrentWeather();

// event listeners
$(document).ready(function() {
    $("button").click(function(event) {
        formSearch();
        event.preventDefault();
    });
});
