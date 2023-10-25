import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import List from "./components/List.jsx";
import NavBar from "./components/NavBar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Filter from "./components/Filter.jsx";
import DetailView from "./components/DetailView.jsx";
import Dashboard from "./components/Dashboard";
import SearchPage from "./components/SearchPage";
import About from "./components/About";
import TemperatureChartCard from "./components/TemperatureChartCard";
import DaytimeDurationChartCard from "./components/DaytimeDurationChartCard";
import "./App.css";
import "rc-slider/assets/index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export const ThemeContext = React.createContext();

const App = () => {
  const [theme, setTheme] = useState("dark"); // Default to dark theme

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      document.body.className = newTheme + "-theme"; // Update the body className
      return newTheme;
    });
  };

  const [allWeatherData, setAllWeatherData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    rainfall: "all",
    windDirection: "all",
    temperature: "all",
    sunrise: "03:00", // Default sunrise time
    sunset: "23:00", // Default sunset time
  });

  // Calculate median
  const median = (arr) => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

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
    if (!timeString || typeof timeString !== "string") return 0;

    const [hours, minutes] = timeString.split(":").map(Number);
    return hours + minutes / 60;
  };

  const filteredData = weatherData.filter((data) => {
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
    const filterSunriseTime = timeToDecimal(filters.sunrise);
    const filterSunsetTime = timeToDecimal(filters.sunset);

    if (sunriseTime < filterSunriseTime || sunsetTime > filterSunsetTime) {
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
      { city: "Houston", country: "US" },
      { city: "Phoenix", country: "US" },
      { city: "Seattle", country: "US" },
      { city: "Los Angeles", country: "US" },
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
    const top10CitiesData = allWeatherData.slice(0, 10);
    console.log("Top 10 Cities Data:", top10CitiesData);
  };

  let medianAQI, medianClouds;
  if (allWeatherData.length > 0) {
    medianAQI = median(allWeatherData.map((data) => data.aqi));
    medianClouds = median(allWeatherData.map((data) => data.clouds));
  }

  // Calculate average temperature
  const averageTemperature =
    allWeatherData.reduce((acc, city) => acc + city.temp, 0) /
    allWeatherData.length;

  // Calculate daytime duration for each city
  const daytimeDurations = allWeatherData.map(
    (data) => timeToDecimal(data.sunset) - timeToDecimal(data.sunrise)
  );

  // Sort the durations and get the median
  const medianDaytimeDuration = median(daytimeDurations);

  // Update the statistics data for the cards
  const summaryData =
    allWeatherData.length > 0
      ? [
          {
            title: "Temperature",
            data: [
              {
                label: `Average Temperature from ${allWeatherData.length} Cities is`,
                value: `${averageTemperature.toFixed(2)}°C`,
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
                label: "Median Daytime Duration is",
                value: `${medianDaytimeDuration.toFixed(2)} hours`,
              },
            ],
          },
        ]
      : [];

  useEffect(() => {
    fetchAllCitiesData();
    // console.log(cardData);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`container ${theme}-theme`}>
        <Router>
          <div className="container">
            <div className="left-panel">
              <Header />
              <NavBar />
            </div>
            <div className="right-panel">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      summaryData={summaryData}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      setWeatherData={setWeatherData}
                      fetchAllCitiesData={fetchAllCitiesData}
                      filters={filters}
                      setFilters={setFilters}
                      filteredData={filteredData}
                      top10CitiesData={allWeatherData.slice(0, 10)}
                    />
                  }
                />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/"
                  element={
                    <div>
                      {/* Cards Container */}
                      <div className="cards-wrapper">
                        {summaryData.map((data, idx) => (
                          <Card key={idx} data={data} />
                        ))}
                      </div>

                      {/* Charts Container */}
                      <div className="charts-wrapper">
                        <div className="chart-card">
                          <TemperatureChartCard
                            data={allWeatherData.slice(0, 10)}
                          />
                        </div>
                        <div className="chart-card">
                          <DaytimeDurationChartCard
                            data={allWeatherData.slice(0, 10)}
                          />
                        </div>
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
                  }
                />
                <Route
                  path="/details/:id"
                  element={<DetailView allWeatherData={allWeatherData} />}
                />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
