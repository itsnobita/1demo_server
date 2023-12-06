document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch weather data from the API
  const fetchWeatherData = async () => {
    try {
      const response = await fetch("/api/v1/weather/current/Jaipur");
      const data = await response.json();

      // Update HTML content with weather data
      document.getElementById("location-name").innerText =
        data.result.location.name;
      document.getElementById(
        "weather-icon"
      ).src = `https:${data.result.current.condition.icon}`;

      const temperatureContainer = document.getElementById(
        "temperature-container"
      );
      temperatureContainer.innerHTML = `<p id="temperature">${data.result.current.temp_c}&deg;C</p>`;

      document.getElementById("condition").innerText =
        data.result.current.condition.text;
      document.getElementById("humidity").innerText =
        data.result.current.humidity;
      document.getElementById("wind-speed").innerText =
        data.result.current.wind_kph;
      document.getElementById("wind-direction").innerText =
        data.result.current.wind_dir;
      document.getElementById("pressure").innerText =
        data.result.current.pressure_mb;
      document.getElementById("visibility").innerText =
        data.result.current.vis_km;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Call the fetchWeatherData function
  fetchWeatherData();
});
const gradientMappings = {
    1000: 'linear-gradient(to bottom, #87CEEB, #1E90FF)', // Clear
    1003: 'linear-gradient(to bottom, #87CEEB, #1E90FF)', // Partly Cloudy
    1006: 'linear-gradient(to bottom, #B0C4DE, #708090)', // Cloudy
    1009: 'linear-gradient(to bottom, #B0C4DE, #708090)', // Overcast
    1063: 'linear-gradient(to bottom, #708090, #778899)', // Patchy rain nearby
    1180: 'linear-gradient(to bottom, #B0E0E6, #87CEEB)', // Patchy snow nearby
    // Add more condition codes and gradients as needed
};

function fetchWeather() {
  const cityName = document.getElementById("city-input").value;

  // Check if the city name is not empty
  if (cityName.trim() === "") {
    alert("Please enter a city name.");
    return;
  }

  // Fetch weather data for the entered city
  fetch(`/api/v1/weather/current/${cityName}`)
    .then((response) => response.json())
    .then((response) => response.result)
    .then((data) => {
      // Update HTML content with new weather data
      document.getElementById("location-name").innerText = data.location.name;
      document.getElementById(
        "weather-icon"
      ).src = `https:${data.current.condition.icon}`;
      // Update background color based on weather condition
      const body = document.body;
      const conditionCode = data.current.condition.code;

      // Define color mappings based on weather condition codes
      

      // Set the background color based on the condition code
      body.style.background = gradientMappings[conditionCode] || 'linear-gradient(to bottom, #ffffff, #ffffff)';
      const temperatureContainer = document.getElementById(
        "temperature-container"
      );
      temperatureContainer.innerHTML = `<p id="temperature">${data.current.temp_c}&deg;C</p>`;

      document.getElementById("condition").innerText =
        data.current.condition.text;
      document.getElementById("humidity").innerText = data.current.humidity;
      document.getElementById("wind-speed").innerText = data.current.wind_kph;
      document.getElementById("wind-direction").innerText =
        data.current.wind_dir;
      document.getElementById("pressure").innerText = data.current.pressure_mb;
      document.getElementById("visibility").innerText = data.current.vis_km;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again.");
    });
}

function getCitySuggestions(cityName) {
  const suggestionsContainer = document.getElementById("suggestions-container");

  // Clear previous suggestions
  suggestionsContainer.innerHTML = "";
  loader.style.display = "block";
  if (cityName == "") {
    loader.style.display = "none";
    return;
  }

  // Fetch city name suggestions from Geonames API
  fetch(`/api/v1/weather/search/${cityName}`)
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      // Display suggestions in a dropdown
      const suggestionsList = document.createElement("ul");
      if (data.result.length == 0) {
        const noMatchingItem = document.createElement("li");
        noMatchingItem.textContent = "No matching city";
        noMatchingItem.classList.add("disabled");
        suggestionsList.appendChild(noMatchingItem);
      } else {
        data.result.forEach((city) => {
          const suggestionItem = document.createElement("li");
          suggestionItem.textContent = city.name;
          suggestionItem.addEventListener("click", () => {
            document.getElementById("city-input").value = city.name;
            suggestionsContainer.innerHTML = ""; // Clear suggestions after selection
            // Fetch weather data for the selected city
            fetchWeather();
          });
          suggestionsList.appendChild(suggestionItem);
        });
        suggestionsContainer.appendChild(suggestionsList);
      }
    })
    .catch((error) => {
      console.error("Error fetching city suggestions:", error);
    });
}

document.addEventListener("click", function (event) {
  const inputWrapper = document.querySelector(".input-wrapper");
  const suggestionsContainer = document.getElementById("suggestions-container");

  if (
    !inputWrapper.contains(event.target) &&
    !suggestionsContainer.contains(event.target)
  ) {
    suggestionsContainer.innerHTML = ""; // Clear suggestions when losing focus outside the input
    loader.style.display = "none";
  }
});
