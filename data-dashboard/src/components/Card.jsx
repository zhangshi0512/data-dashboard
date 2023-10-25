import React from "react";

const Card = ({ data }) => {
  if (!data) {
    return <div className="card">No data available</div>;
  }

  // Check if data is summary data from the dashboard or detailed data from the search page
  const isSummaryData = data.title && data.data;

  if (isSummaryData) {
    return (
      <div className="card">
        <h3>{data.title}</h3>
        {data.data.map((item, idx) => (
          <p key={idx}>
            {item.label}: {item.value}
          </p>
        ))}
      </div>
    );
  } else {
    // Handle detailed data from the search page
    return (
      <div className="card">
        <h3>{data.city_name}</h3>
        <p>Temperature: {data.temp}°C</p>
        <p>Wind Speed: {data.wind_spd} m/s</p>
        <p>Humidity: {data.rh}%</p>
        <p>Weather: {data.weather ? data.weather.description : "N/A"}</p>
        {/* You can add more fields from the API response as needed */}
      </div>
    );
  }
};

export default Card;
