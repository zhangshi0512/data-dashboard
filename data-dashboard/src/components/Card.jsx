import React from "react";

const Card = ({ data }) => {
  if (!data) {
    return <div className="card">No data available</div>;
  }

  // const weather = data.data[0];

  return (
    <div className="card">
      <h3>{data.city_name}</h3>
      <p>{data.weather.description}</p>
      <p>Temperature: {data.app_temp}°C</p>
      <p>Air Quality Index: {data.aqi}</p>
      <p>Clouds: {data.clouds}%</p>
      <p>Country: {data.country_code}</p>
      {/* Display other relevant data as needed */}
    </div>
  );
};

export default Card;
