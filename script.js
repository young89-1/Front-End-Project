// This is the input for the button
const search = document.getElementById("search");
const fortune = document.getElementById("fortune");
const input = document.getElementById("search");

// Program runs when button is clicked
document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  fetchWeatherData();
});

// Have program run when someone presses enter
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("btn").click();
  }
});

// Weather API
function fetchWeatherData() {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?key=${weatherapi}`
  )

  // This code is making a request to a weather API and retrieving the temperature data from the response
    .then((response) => response.json())
    .then(async (data) => {
      const temp = data.currentConditions.temp;
      console.log(temp);
      let prompt;
      if (temp < 50) {
        prompt =
          "It is very, very cold where I am, can you give me a fortune to help me feel better about myself that is related to my current cold temperature?";
      } else if (temp >= 50 && temp < 60) {
        prompt =
          "It is cold where I am and it is affecting my mood, can you cheer me up with a fortune that will help me feel better?";
      } else if (temp >= 60 && temp < 70) {
        prompt =
          "It is a very comfortable temperature where I am, can you share a fortune based on a nice temperature?";
      } else if (temp >= 70 && temp < 85) {
        prompt =
          "The weather is starting to get hotter where I am, can you give me a fortune that is related to my current temperature and inspire me?";
      } else if (temp >= 85) {
        prompt =
          "It is very, very hot where I am, can you give me a fortune to help me feel better about myself that is related to my current hot temperature?";
      }
      await fetchOpenAI(temp, prompt);
    });
}

// Open AI API
function fetchOpenAI(temp, prompt) {

  fetch(`https://api.openai.com/v1/completions`, {
    body: JSON.stringify({
      model: "text-davinci-003",
      //   prompt: `Tell me a fortune for a person living in a temperature of ${temp} degrees.`,
      prompt: prompt,
      temperature: 0,
      max_tokens: 50,
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${openai}`,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
      throw new Error("Request failed.");
    })
    .then((json) => {
      console.log(json);

// Populate the fortune in the HTML + reveal card
      document.getElementById("fortune").textContent = json.choices[0].text;
      reveal();
      // run the function that hides loading bar
      hide();
    })
    .catch((error) => {
      console.error(error);
    });
}
// function to hide and reveal the fortune
function reveal() {
  const f = document.getElementById("fortune");
  if (f.style.display === "none") {
    f.style.display = "block";
  } else {
    f.style.display = "none";
  }
}
//function to reveal loading bar
function load() {
  const l = document.getElementById("load");
  l.style.display = "block";
}
//function to hide the loading bar
function hide() {
  const l = document.getElementById("load");
  l.style.display = "none";
}
