import React from "react";

const Card = ({ data }) => {
  if (!data || !data.data || data.data.length === 0) {
    return <div className="card">No data available</div>;
  }

  const weather = data.data[0];

  return (
    <div className="card">
      <h3>{weather.city_name}</h3>
      <p>{weather.weather.description}</p>
      <p>Temperature: {weather.app_temp}°C</p>
      <p>Air Quality Index: {weather.aqi}</p>
      <p>Clouds: {weather.clouds}%</p>
      <p>Country: {weather.country_code}</p>
      {/* Display other relevant data as needed */}
    </div>
  );
};

export default Card;
