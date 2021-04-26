var userInput = document.querySelector('#city-search').value
console.log(userInput)
var cityName = 'Austin'
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=d0077aed95867e04393883a9e7a5d3f5')
.then(response => response.json()).then(data => console.log(data))
