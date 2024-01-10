import "./App.css";
import { useState, useEffect } from "react";
import { sampleData } from "./sampleData";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
function App() {
  const [cityName, setCityName] = useState("Mumbai");
  const [inputCityName, setInputCityName] = useState("");
  const [data, setData] = useState(sampleData);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;

  // fetching using city name
  const getWeatherData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );
      const responseData = await response.json();
      if (response.status === 200) {
        console.log(`data fetched for city ${cityName} `, responseData);
        setData(responseData);
        setIsLoading(false);
      } else {
        console.log(`data cannot be fetched for ${cityName}`);
      }
    } catch (e) {
      console.log("Error fetching data from server ", e);
    }
  };

  // fetching using user's geographic location
  const getWeatherDataBasedOnLocation = async (latitude, longitude) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      const responseData = await response.json();
      if (response.status === 200) {
        console.log(`data fetched for city ${data.name} `, responseData);
        setCityName(data.name);
        setData(responseData);
        setIsLoading(false);
      } else {
        console.log(`data cannot be fetched for ${data.Name}`);
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
    setInputCityName("");
    console.log("inside on click of search button");
    console.log("input search city name : ", inputCityName);
  };

  const fetchUsersLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherDataBasedOnLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user's location: ", error.message);
        }
      );
    }
  };
  console.log("final data object : ", data);

  return (
    <div className="App">
      <h1>Weather App</h1>

      {isLoading === true ? (
        "Loading"
      ) : (
        <div className="p-12">
          <SearchBar
            handleSearch={handleSearch}
            onFetchUserLocation={fetchUsersLocation}
            isLoading={isLoading}
            inputCityName={inputCityName}
            handleInput={handleInput}
          ></SearchBar>
          <WeatherCard data={data}></WeatherCard>
        </div>
      )}
    </div>
  );
}

export default App;
