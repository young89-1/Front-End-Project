// This is the input for the button
const search = document.getElementById("search");

document.getElementById("btn") 
    .addEventListener("click", (e) => {
    e.preventDefault();
    fetchWeatherData();
    });

    // Weather API
function fetchWeatherData() {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?key=24S9KU9RJJ6BBP3MT9EMRXLF3`)
    .then(response => response.json())
    .then(data => {
        console.log(data.currentConditions.temp)
        return data.currentConditions.temp});
}

