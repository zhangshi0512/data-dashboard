import React from "react";
import { useNavigate } from "react-router-dom";

const List = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (cityName) => {
    navigate(`/details/${cityName}`);
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="header-item">City</div>
        <div className="header-item">Temperature (°C)</div>
        <div className="header-item">Rainfall</div>
        <div className="header-item">Wind</div>
        <div className="header-item">Sunrise</div>
        <div className="header-item">Sunset</div>
        <div className="header-item">Datetime</div>
      </div>
      {data.map((item) => (
        <div
          key={item.lon + "-" + item.lat}
          className="list-item"
          onClick={() => handleRowClick(item.city_name)}
        >
          <div className="list-city clickable">{item.city_name}</div>
          <div>{item.temp}°C</div>
          <div>{item.precip !== 0 ? item.precip.toFixed(2) : item.precip}</div>
          <div>{item.wind_cdir_full}</div>
          <div>{item.sunrise}</div>
          <div>{item.sunset}</div>
          <div>{item.datetime}</div>
        </div>
      ))}
    </div>
  );
};

export default List;
