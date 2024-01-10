import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [cityName, setCityName] = useState("Mumbai");
  const [inputCityName, setInputCityName] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;

  const getWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(`data fetched for city ${cityName} `, data);
      } else {
        console.log(`data cannot be fetched for ${cityName}`);
      }
    } catch (e) {
      console.log("Error fetching data from server ", e);
    }
  };

  useEffect(() => {
    getWeatherData();
    // the below line will make sure,getWeatherData() does not have to be included as dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName, setCityName]);

  const handleInput = (e) => {
    const value = e.target.value;
    setInputCityName(value);
  };
  const handleSearch = (e) => {
    setCityName(inputCityName);
    console.log("inside on click of search button");
    console.log("input search city name : ", inputCityName);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <h1>Weather Data for {`${cityName}`}</h1>
        <input
          type="text"
          onChange={handleInput}
          placeholder="Search city"
        ></input>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default App;
