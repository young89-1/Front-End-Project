// This is the input for the button
const search = document.getElementById("search");

document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  fetchWeatherData();
  // fetchOpenAI(); // call the fetchOpenAI function
});

// Weather API
function fetchWeatherData() {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?key=24S9KU9RJJ6BBP3MT9EMRXLF3`
  )
    .then((response) => response.json())
    .then((data) => {
        const temp = data.currentConditions.temp
      console.log(temp);
      fetchOpenAI(temp)
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

// Make a POST request to the OpenAI API
// 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

// if...else statement to use different prompts based on temperature ranges
// function fetchOpenAI(temp) {
// let prompt;
// if (temp < 70) {
//     prompt = 'Tell me a new fortune for a person living in a cold temperature';
// } else {
//     prompt = 'Tell me a new fortune for a person living in a hot temperature';
// }





function fetchOpenAI() {
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
      Authorization: "Bearer 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",
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
    })
    .catch((error) => {
      console.error(error);
    });
}
//   }).then((response) => {
//     if (response.ok) {
//       response.json().then((json) => {
//         console.log(json);
//         return json;
//       });
//     }
//   });
// }

// function to hide and reveal the fortune
function reveal() {
  const f = document.getElementById("fortune");
  if (f.style.display === "none") {
    f.style.display = "block";
  } else {
    f.style.display = "none";
  }
}
