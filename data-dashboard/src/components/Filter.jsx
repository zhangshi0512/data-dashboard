import React from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const Filter = ({ filters, setFilters }) => {
  // Handle filter change
  const handleFilterChange = (e, filterType) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const marks = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13",
    14: "14",
    15: "15",
    16: "16",
    17: "17",
    18: "18",
    19: "19",
    20: "20",
    21: "21",
    22: "22",
    23: "23",
    24: "24",
  };

  // Compute position based on time
  const computePosition = (time) => {
    if (typeof time !== "string") return 0; // Check if time is a string
    const [hour, minute] = time.split(":").map(Number);
    return ((hour + minute / 60) / 24) * 100;
  };

  const sunrisePosition = computePosition(filters.sunrise || "06:00");
  const sunsetPosition = computePosition(filters.sunset || "18:00");

  const formatTime = (time) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="filters">
      {/* Rainfall filter */}
      <select
        className="rainfall-filter"
        value={filters.rainfall}
        onChange={(e) => handleFilterChange(e, "rainfall")}
      >
        <option value="all">All Rainfall</option>
        <option value="yes">With Rainfall</option>
        <option value="no">Without Rainfall</option>
      </select>

      {/* Wind direction filter */}
      <select
        className="wind-direction-filter"
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
        className="temperature-filter"
        value={filters.temperature}
        onChange={(e) => handleFilterChange(e, "temperature")}
      >
        <option value="all">All Temperatures</option>
        <option value="cold">Below 10°C</option>
        <option value="moderate">Between 10°C and 26°C</option>
        <option value="hot">Above 26°C</option>
      </select>

      {/* Sunrise & Sunset slider */}
      <div className="range-wrapper">
        <span className="sunrise-label" style={{ left: `${sunrisePosition}%` }}>
          Sunrise
        </span>
        <Range
          min={0}
          max={24}
          step={0.25} // Assuming you want to step in 15-minute intervals
          defaultValue={[filters.sunrise, filters.sunset]}
          onAfterChange={(value) => {
            setFilters((prev) => ({
              ...prev,
              sunrise: formatTime(value[0]),
              sunset: formatTime(value[1]),
            }));
          }}
          marks={marks}
        />
        <span className="sunset-label" style={{ left: `${sunsetPosition}%` }}>
          Sunset
        </span>
      </div>
    </div>
  );
};

export default Filter;
