import React from "react";

const List = ({ data }) => {
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
          <tr key={item.lon + "-" + item.lat}>
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
