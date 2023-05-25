

// this is the weather API
function fetchWeatherData() {
fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=24S9KU9RJJ6BBP3MT9EMRXLF3')
.then(response => response.json())
.then(data => console.log(data))
}

fetchWeatherData();