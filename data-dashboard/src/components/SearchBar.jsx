import React, { useState, useEffect } from "react";

const SearchBar = (props) => {
  const handleSearch = async () => {
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
      props.setWeatherData(data.data);
    } else {
      props.setWeatherData([]); // set empty array if no data found for the city
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by city name..."
        value={props.searchTerm}
        onChange={(e) => props.setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
