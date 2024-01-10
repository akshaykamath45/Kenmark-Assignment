import React from "react";
import { Card, Text, Metric, Grid, Title, Col } from "@tremor/react";

export const WeatherCard = ({ data }) => {
  return (
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
  );
};

export default WeatherCard;
