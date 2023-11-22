const API_KEY = '5af0e95975186408ed52a2191125ef58';
const city = 'Dhaka'; 
const forecastContainer = document.getElementById('forecast-container');

// Function to fetch weather data
async function fetchWeatherData() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to display forecast
function displayForecast(data) {
  forecastContainer.innerHTML = '';

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

    const card = document.createElement('div');
    card.classList.add('forecast-card');

    card.innerHTML = `
      <h2>${day}</h2>
      <img src="${iconUrl}" alt="${item.weather[0].description}">
      <p>${Math.round(item.main.temp)}°C</p>
      <p>${item.weather[0].description}</p>
    `;

    forecastContainer.appendChild(card);
  });
}

// Fetch weather data and display forecast on page load
$(document).ready(async () => {
  const weatherData = await fetchWeatherData();
  displayForecast(weatherData);
});
