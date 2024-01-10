import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [cityName, setCityName] = useState("Mumbai");
  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log(API_KEY);
  const getWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(`data fetched for city ${cityName} `, data);
      }else{
        console.log(`data cannot be fetched for ${cityName}`)
      }
    } catch (e) {
      console.log("Error fetching data from server ", e);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <h1>Weather Data for Mumbai</h1>
      </div>
    </div>
  );
}

export default App;
