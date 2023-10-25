import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DetailView = ({ allWeatherData }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const detailData = allWeatherData.find((item) => item.city_name === id);
    setDetails(detailData);
  }, [id, allWeatherData]);

  if (!details) return <p>Loading...</p>;

  return (
    <div className="details-wrapper">
      <div className="card">
        <h2>{details.city_name}</h2>
        <p>Weather: {details.weather.description}</p>
        <p>Temperature: {details.temp}°C</p>
        <p>Rainfall: {details.precip}</p>
        <p>Sunrise: {details.sunrise}</p>
        <p>Sunset: {details.sunset}</p>
        <p>Time: {details.datetime}</p>
      </div>
      <div className="map">
        <h3>City Map</h3>
        <MapContainer
          center={[details.lat, details.lon]}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[details.lat, details.lon]}>
            <Popup>{details.city_name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default DetailView;
