// This is the input for the button
document.getElementById("btn") 
    .addEventListener("click", (e) => {
    e.preventDefault();
    console.log("submit");
    });

// this is the weather API
function fetchWeatherData() {
fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=24S9KU9RJJ6BBP3MT9EMRXLF3')
.then(response => response.json())
.then(data => console.log(data))
}

fetchWeatherData();