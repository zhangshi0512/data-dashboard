import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import List from "./components/List.jsx";
import NavBar from "./components/NavBar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Filter from "./components/Filter.jsx";
import "./App.css";
import "rc-slider/assets/index.css";

const App = () => {
  const [allWeatherData, setAllWeatherData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    rainfall: "all",
    windDirection: "all",
    temperature: "all",
  });

  const convertWindDirectionToFullForm = (abbreviation) => {
    switch (abbreviation) {
      case "N":
        return "north";
      case "S":
        return "south";
      case "E":
        return "east";
      case "W":
        return "west";
      case "NE":
        return "northeast";
      case "NW":
        return "northwest";
      case "SE":
        return "southeast";
      case "SW":
        return "southwest";
      default:
        return abbreviation;
    }
  };

  const timeToDecimal = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours + minutes / 60;
  };

  const filteredData = allWeatherData.filter((data) => {
    // Filter logic for rainfall
    if (filters.rainfall === "yes" && data.precip <= 0) return false;
    if (filters.rainfall === "no" && data.precip > 0) return false;

    // Filter logic for wind direction
    const fullWindDirection = convertWindDirectionToFullForm(
      data.wind_cdir.toLowerCase()
    );

    if (
      filters.windDirection !== "all" &&
      !data.wind_cdir_full.includes(filters.windDirection)
    ) {
      return false;
    }

    // Filter logic for temperature
    if (filters.temperature === "cold" && data.temp >= 10) return false;
    if (
      filters.temperature === "moderate" &&
      (data.temp < 10 || data.temp > 26)
    )
      return false;
    if (filters.temperature === "hot" && data.temp <= 26) return false;

    // Filter logic for sunrise and sunset time
    const sunriseTime = timeToDecimal(data.sunrise);
    const sunsetTime = timeToDecimal(data.sunset);

    if (sunriseTime < filters.sunrise || sunsetTime > filters.sunset) {
      return false;
    }

    return true;
  });

  const fetchWeatherDataForCity = async (city, country) => {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=${
          import.meta.env.VITE_WEATHERBIT_API_KEY
        }`
      );
      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        return data.data[0]; // returns the first (and only) item from the data array
      }
      return null;
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error);
    }
  };

  const fetchAllCitiesData = async () => {
    const cities = [
      { city: "Raleigh", country: "US" },
      { city: "Chicago", country: "US" },
      { city: "New York City", country: "US" },
      { city: "Seattle", country: "US" },
      { city: "San Francisco", country: "US" },
      { city: "Berlin", country: "DE" },
      { city: "Paris", country: "FR" },
      { city: "Lyon", country: "FR" },
      { city: "London", country: "GB" },
      { city: "Tokyo", country: "JP" },
      { city: "Sydney", country: "AU" },
      { city: "Mumbai", country: "IN" },
      { city: "Cape Town", country: "ZA" },
      { city: "Rio de Janeiro", country: "BR" },
      { city: "Moscow", country: "RU" },
      { city: "Beijing", country: "CN" },
      { city: "Shanghai", country: "CN" },
      { city: "Bangkok", country: "TH" },
      { city: "Cairo", country: "EG" },
      { city: "Mexico City", country: "MX" },
      { city: "Buenos Aires", country: "AR" },
    ];

    const allData = await Promise.all(
      cities.map((cityObj) =>
        fetchWeatherDataForCity(cityObj.city, cityObj.country)
      )
    );
    setAllWeatherData(allData.filter(Boolean));
    setWeatherData(allData.filter(Boolean)); // filter out any null values
    // console.log(allData.filter(Boolean));
  };

  let lowestTempCity,
    highestTempCity,
    medianAQI,
    medianClouds,
    earliestSunriseCity,
    latestSunsetCity;
  if (allWeatherData.length > 0) {
    // Existing calculations
    lowestTempCity = allWeatherData.reduce(
      (acc, city) => (acc.temp < city.temp ? acc : city),
      allWeatherData[0]
    );
    highestTempCity = allWeatherData.reduce(
      (acc, city) => (acc.temp > city.temp ? acc : city),
      allWeatherData[0]
    );
    medianAQI = median(allWeatherData.map((data) => data.aqi));
    medianClouds = median(allWeatherData.map((data) => data.clouds));
    earliestSunriseCity = allWeatherData.reduce(
      (acc, city) =>
        timeToDecimal(acc.sunrise) < timeToDecimal(city.sunrise) ? acc : city,
      allWeatherData[0]
    );
    latestSunsetCity = allWeatherData.reduce(
      (acc, city) =>
        timeToDecimal(acc.sunset) > timeToDecimal(city.sunset) ? acc : city,
      allWeatherData[0]
    );
  }

  // // Find the city with the lowest and highest temperature
  // const lowestTempCity = allWeatherData.reduce(
  //   (acc, city) => (acc.temp < city.temp ? acc : city),
  //   allWeatherData[0]
  // );
  // const highestTempCity = allWeatherData.reduce(
  //   (acc, city) => (acc.temp > city.temp ? acc : city),
  //   allWeatherData[0]
  // );

  // // Calculate median
  // const median = (arr) => {
  //   const mid = Math.floor(arr.length / 2),
  //     nums = [...arr].sort((a, b) => a - b);
  //   return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  // };

  // // Calculate the median AQI and Clouds percentage
  // const medianAQI = median(allWeatherData.map((data) => data.aqi));
  // const medianClouds = median(allWeatherData.map((data) => data.clouds));

  // // Find the city with the earliest sunrise and latest sunset
  // const earliestSunriseCity = allWeatherData.reduce(
  //   (acc, city) =>
  //     timeToDecimal(acc.sunrise) < timeToDecimal(city.sunrise) ? acc : city,
  //   allWeatherData[0]
  // );
  // const latestSunsetCity = allWeatherData.reduce(
  //   (acc, city) =>
  //     timeToDecimal(acc.sunset) > timeToDecimal(city.sunset) ? acc : city,
  //   allWeatherData[0]
  // );

  // Statistics data for the cards
  const summaryData =
    allWeatherData.length > 0
      ? [
          {
            title: "Temperature",
            data: [
              {
                label: "Lowest",
                value: `${lowestTempCity.temp}°C in ${lowestTempCity.city_name}`,
              },
              {
                label: "Highest",
                value: `${highestTempCity.temp}°C in ${highestTempCity.city_name}`,
              },
            ],
          },
          {
            title: "Air & Clouds",
            data: [
              { label: "Median AQI", value: medianAQI },
              { label: "Median Clouds %", value: `${medianClouds}%` },
            ],
          },
          {
            title: "Sun",
            data: [
              {
                label: "Earliest Sunrise",
                value: `${earliestSunriseCity.sunrise} in ${earliestSunriseCity.city_name}`,
              },
              {
                label: "Latest Sunset",
                value: `${latestSunsetCity.sunset} in ${latestSunsetCity.city_name}`,
              },
            ],
          },
        ]
      : [];

  // const cardCities = ["Seattle", "New York City", "Chicago"];
  // const cardData = allWeatherData.filter((data) =>
  //   cardCities.includes(data.city_name)
  // );

  // console.log(cardData.length);

  useEffect(() => {
    fetchAllCitiesData();
    // console.log(cardData);
  }, []);

  return (
    <div className="container">
      <div className="left-panel">
        <Header />
        <NavBar />
      </div>
      <div className="right-panel">
        <div className="cards-wrapper">
          {summaryData.map((data, idx) => (
            <Card key={idx} data={data} />
          ))}
        </div>
        <SearchBar
          className="search-bar"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setWeatherData={setWeatherData}
          fetchAllCitiesData={fetchAllCitiesData}
        />
        <Filter filters={filters} setFilters={setFilters} />
        <div className="list-wrapper">
          <List data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default App;
