import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import List from "./components/List.jsx";
import NavBar from "./components/NavBar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Filter from "./components/Filter.jsx";
import "./App.css";

// Import SearchBar and Filter once they're defined

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

  const cardCities = ["Seattle", "New York City", "Chicago"];
  const cardData = allWeatherData.filter((data) =>
    cardCities.includes(data.city_name)
  );

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
          {cardData.length > 0 ? (
            cardData.map((data) => <Card key={data.city_name} data={data} />)
          ) : (
            <p>No data available</p>
          )}
        </div>
        <SearchBar
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
