import React from "react";

const Filter = ({ filters, setFilters }) => {
  // Handle filter change
  const handleFilterChange = (e, filterType) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  return (
    <div className="filters">
      {/* Rainfall filter */}
      <select
        value={filters.rainfall}
        onChange={(e) => handleFilterChange(e, "rainfall")}
      >
        <option value="all">All Rainfall</option>
        <option value="yes">With Rainfall</option>
        <option value="no">Without Rainfall</option>
      </select>

      {/* Wind direction filter */}
      <select
        value={filters.windDirection}
        onChange={(e) => handleFilterChange(e, "windDirection")}
      >
        <option value="all">All Wind Directions</option>
        <option value="north">North</option>
        <option value="south">South</option>
        <option value="east">East</option>
        <option value="west">West</option>
      </select>

      {/* Temperature filter */}
      <select
        value={filters.temperature}
        onChange={(e) => handleFilterChange(e, "temperature")}
      >
        <option value="all">All Temperatures</option>
        <option value="cold">Below 10°C</option>
        <option value="moderate">Between 10°C and 26°C</option>
        <option value="hot">Above 26°C</option>
      </select>
    </div>
  );
};

export default Filter;
