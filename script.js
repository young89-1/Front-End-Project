console.log(openai);

// This is the input for the button
const search = document.getElementById("search");
const fortune = document.getElementById("fortune");

document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  fetchWeatherData();
  // fetchOpenAI(); // call the fetchOpenAI function
});

// Weather API
function fetchWeatherData() {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?key=${weatherapi}`
  )
    .then((response) => response.json())
    .then(async(data) => {
        const temp = data.currentConditions.temp
      console.log(temp);
      await fetchOpenAI(temp)
    });
}

// Fortune populating based on Temp
// function tempOptions(temp) {
//   if (temp < 70) {
//     fetchOpenAI("it is cool");
//   } else {
//     fetchOpenAI("it is warm");
//   }
// }

// if...else statement to use different prompts based on temperature ranges
// function fetchOpenAI(temp) {
// let prompt;
// if (temp < 70) {
//     prompt = 'Tell me a new fortune for a person living in a cold temperature';
// } else {
//     prompt = 'Tell me a new fortune for a person living in a hot temperature';
// }


function fetchOpenAI(temp) {
  fetch(`https://api.openai.com/v1/completions`, {
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Tell me a fortune for a person living in a temperature of ${temp} degrees.`,     
    //   prompt: prompt,     
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
        console.log(response)
      if (response.ok) {
        return response.json();
      }
      throw new Error("Request failed.");
    })
    .then((json) => {
      console.log(json);


      // Populate the fortune in the HTML
      document.getElementById("fortune").textContent = json.choices[0].text;
      reveal();
    })
    .catch((error) => {
      console.error(error);
    });
}

// function to hide and reveal the fortune
function reveal() {
  const f = document.getElementById("fortune");
  // document.addEventListener("DOMContentLoaded")
  if (f.style.display === "none") {
    f.style.display = "block";
  } else {
    f.style.display = "none";
  }
}


