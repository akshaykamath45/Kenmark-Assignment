import "./App.css";
import { useState, useEffect } from "react";
import { Card, Text, Metric, Grid, Title, Col } from "@tremor/react";
import { Button, Stack } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { Input } from "@chakra-ui/react";

function App() {
  const [cityName, setCityName] = useState("Mumbai");
  const [inputCityName, setInputCityName] = useState("");
  const [data, setData] = useState({
    coord: {
      lon: 10.99,
      lat: 44.34,
    },
    weather: [
      {
        id: 501,
        main: "Rain",
        description: "moderate rain",
        icon: "10d",
      },
    ],
    base: "stations",
    main: {
      temp: 298.48,
      feels_like: 298.74,
      temp_min: 297.56,
      temp_max: 300.05,
      pressure: 1015,
      humidity: 64,
      sea_level: 1015,
      grnd_level: 933,
    },
    visibility: 10000,
    wind: {
      speed: 0.62,
      deg: 349,
      gust: 1.18,
    },
    rain: {
      "1h": 3.16,
    },
    clouds: {
      all: 100,
    },
    dt: 1661870592,
    sys: {
      type: 2,
      id: 2075663,
      country: "IT",
      sunrise: 1661834187,
      sunset: 1661882248,
    },
    timezone: 7200,
    id: 3163858,
    name: "Zocca",
    cod: 200,
  });
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
      <div className="search-component">
        <Input
          type="text"
          onChange={handleInput}
          placeholder="Search city"
          value={inputCityName}
          htmlSize={75}
          width="auto"
          variant="outline"
          size="md"
        ></Input>
        <Stack direction="row" spacing={4} align="center">
          <Button onClick={handleSearch} colorScheme="blue">
            Search
          </Button>
          <Button
            onClick={fetchUsersLocation}
            colorScheme="blue"
            isLoading={isLoading}
            spinner={<BeatLoader size={8} color="white" />}
          >
            User Location
          </Button>
        </Stack>
      </div>
      {isLoading === true ? (
        "Loading"
      ) : (
        <main className="p-12">
          <Title style={{ color: "black" }}>
            Weather Data for {`${data.name}`}
          </Title>
          <Text>Weather Dashboard</Text>

          <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2">
            <Col numColSpan={1} numColSpanLg={2}>
              <Card>
                <Text>Location</Text>
                <Metric>Country {data.sys.country}</Metric>
                <Metric>Latitude {data.coord.lat}</Metric>
                <Metric>Longitude {data.coord.lon}</Metric>
                <Metric>City Name {data.name}</Metric>
                <Metric>Sunrise {data.sys.sunrise}</Metric>
                <Metric>Sunset {data.sys.sunset}</Metric>
              </Card>
            </Col>
            <Card>
              <Text>Weather Condition</Text>
              {data.weather.map((elements, index) => (
                <div key={index}>
                  <Metric>Description {elements.description}</Metric>
                  <Metric>Main Condition {elements.main}</Metric>
                  <Metric>Icon {elements.icon}</Metric>
                </div>
              ))}
            </Card>
            <Col>
              <Card>
                <Text>Temperature</Text>
                <Metric>Current Temperature {data.main.temp}</Metric>
                <Metric>Feels Like {data.main.feels_like}</Metric>
                <Metric>Min Temperature {data.main.temp_min}</Metric>
                <Metric>Min Temperature {data.main.temp_min}</Metric>
                <Metric>Max Temperature {data.main.temp_max}</Metric>
              </Card>
            </Col>
            <Card>
              <Text>Atmospheric Conditions</Text>
              <Metric>Pressure {data.main.pressure}</Metric>
              <Metric>Humidity {data.main.humidity}</Metric>
            </Card>
            <Card>
              <Text>Wind and Visibility</Text>
              <Metric>Wind Speed {data.wind.speed}</Metric>
              <Metric>Wind Direction (Degrees) {data.wind.deg}</Metric>
              <Metric>Visibility {data.visibility}</Metric>
            </Card>
          </Grid>
        </main>
      )}
    </div>
  );
}

export default App;
