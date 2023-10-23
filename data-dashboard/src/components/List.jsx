import React from "react";
import { useNavigate } from "react-router-dom";

const List = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (cityName) => {
    navigate(`/details/${cityName}`);
  };

  return (
    <table className="list">
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature (°C)</th>
          <th>Rainfall</th>
          <th>Wind</th>
          <th>Sunrise</th>
          <th>Sunset</th>
          <th>Datetime</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.lon + "-" + item.lat}
            onClick={() => handleRowClick(item.city_name)}
          >
            <td>{item.city_name}</td>
            <td>{item.temp}</td>
            <td>{item.precip}</td>
            <td>{item.wind_cdir_full}</td>
            <td>{item.sunrise}</td>
            <td>{item.sunset}</td>
            <td>{item.datetime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
