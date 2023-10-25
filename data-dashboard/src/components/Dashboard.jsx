import React from "react";
import Card from "./Card.jsx";
import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import List from "./List.jsx";
import TemperatureChartCard from "./TemperatureChartCard";
import DaytimeDurationChartCard from "./DaytimeDurationChartCard";

const Dashboard = ({
  summaryData,
  searchTerm,
  setSearchTerm,
  setWeatherData,
  fetchAllCitiesData,
  filters,
  setFilters,
  filteredData,
  top10CitiesData,
}) => {
  console.log("Top 10 Cities Data in Dashboard: ", top10CitiesData);

  return (
    <div>
      <div className="cards-wrapper">
        {summaryData.map((data, idx) => (
          <Card key={idx} data={data} />
        ))}
      </div>
      <div className="charts-wrapper">
        <TemperatureChartCard data={top10CitiesData} />
        <DaytimeDurationChartCard data={top10CitiesData} />
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
  );
};

export default Dashboard;
