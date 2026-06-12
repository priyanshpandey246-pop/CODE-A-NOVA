console.log("js file loaded")
async function getWeather(cityName) {
  if (!cityName) {
    cityName = document.getElementById("cityInput").value;
  }

  // STEP 1: CITY / DISTRICT → LAT/LON
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5`
  );

  const geoData = await geoResponse.json();

  if (!geoData.results) {
    console.log("Location not found");
    return;
  }

  const lat = geoData.results[0].latitude;
  const lon = geoData.results[0].longitude;
  const placeName = geoData.results[0].name;

  // STEP 2: WEATHER API
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&forecast_days=1`
  );
  const weatherData = await weatherResponse.json();
  console.log(weatherData);
  const current = weatherData.current;
  const hourly = weatherData.hourly;
  console.log("CURRENT OBJECT:", current);
  console.log("HOURLY OBJECT: hourly");

  let forecastHTML = "";
  for (let i=0; i < 6; i++) {
    forecastHTML += `<div style="padding:10px; border:1px solid #ccc; border-radius:10px; min-width:120px; text-align:center;">
    <p>Time: ${hourly.time[i]}</p>
    <p>Temp: ${hourly.temperature_2m[i]}°C</p>
    </div>
    `;
  }
  document.getElementById("forecast").innerHTML = forecastHTML;

  document.getElementById("temperature").textContent = current.temperature_2m + "°C";
  document.getElementById("humidity").textContent = current.relative_humidity_2m + "%";
  document.getElementById("windspeed").textContent = current.wind_speed_10m + "km/h";
  console.log("Place:", placeName);

  // Weather Condition
  const code = Number(current.weather_code);
  console.log("code:", code);
  let condition = "--";
  let imageUrl = "cloud.png";
  if (code === 0) {
    condition = "Clear Sky";
    imageUrl = "sun.png";
  } else if (code === 1 || code === 2 || code === 3) {
    condition = "Partly Cloudy";
    imageUrl = "cloud2.png";
  } else if (code >= 45 && code <= 48) {
    condition = "Foggy";
    imageUrl = "foggy.png";

  } else if (code >= 51 && code <= 67) {
    condition = "Rainy";
    imageUrl = "rain.png";
  }
  else if (code >= 71 && code <= 77) {
    condition = "Snowy";
    imageUrl = "snowy.png"
  }
  else if (code >= 80 && code <= 82) {
    condition = "Heavy Rain";
    imageUrl = "heavy-rain.png";
  }
  else {
    condition = "Unknown Weather";
    imageUrl = "cloud.png";
  }
  document.getElementById("condition").textContent = condition;
  document.getElementById("WeatherImage").src = imageUrl;
}