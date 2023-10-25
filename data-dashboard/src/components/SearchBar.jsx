import React, { useState, useEffect } from "react";

const SearchBar = (props) => {
  const handleDashboardSearch = async () => {
    if (props.searchTerm.trim() === "") {
      props.fetchAllCitiesData(); // fetch all cities data if the search term is empty
      return;
    }

    const response = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${props.searchTerm}&key=${
        import.meta.env.VITE_WEATHERBIT_API_KEY
      }`
    );
    const data = await response.json();
    if (data && data.data && data.data.length > 0) {
      // Add the conditional check here
      if (props.setWeatherData) {
        props.setWeatherData(data.data[0]);
        console.log(data);
      }
    } else {
      // And here
      if (props.setWeatherData) {
        props.setWeatherData([]); // set empty array if no data found for the city
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    props.onSelectCity(suggestion);
    props.setSearchTerm(suggestion.city);
  };

  return (
    <div className="search-bar">
      <input
        className="city-search"
        type="text"
        placeholder="Search by city name..."
        value={props.searchTerm}
        onChange={(e) => props.setSearchTerm(e.target.value)}
      />
      <button onClick={handleDashboardSearch}>Search</button>
      {props.mode === "searchPage" &&
      props.suggestions &&
      props.suggestions.length > 0 ? (
        <div className="suggestions-dropdown">
          {props.suggestions.map((suggestion) => (
            <div
              key={suggestion.city}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.city}, {suggestion.country}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
