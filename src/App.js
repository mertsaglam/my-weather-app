import "./App.css";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Search from "./components/search/Search";
import { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, long] = searchData.value.split(",");
    console.log(lat, long);
    const roundedLong = parseFloat(long).toFixed(2);
    const currentWeatherFetch = fetch(
      `${OPEN_WEATHER_API_URL}weather?&lat=${lat}&lon=${roundedLong}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${OPEN_WEATHER_API_URL}forecast?&lat=${lat}&lon=${roundedLong}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async(response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast({city: searchData.label, ...forecastResponse});
    })
    .catch((error) => 
      console.log(error));
  };

  console.log(currentWeather);
  console.log(currentWeather?.main?.temp);
  console.log("forecast")
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
