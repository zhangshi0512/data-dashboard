import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailView = ({ allWeatherData }) => {
  const { id } = useParams(); // get the id from the URL
  const [details, setDetails] = useState(null); // state to store the details

  useEffect(() => {
    console.log("City name from URL:", id);
    // Fetch the details based on the id
    // For now, let's simulate fetching by filtering from the data
    // Assuming you have access to the data array
    const detailData = allWeatherData.find((item) => item.city_name === id);
    setDetails(detailData);
  }, [id]);

  // If no details, show a loading message
  if (!details) return <p>Loading...</p>;

  return (
    <div>
      <h2>{details.city_name}</h2>
      {/* Display other details as you see fit */}
      <p>Temperature: {details.temp}°C</p>
      <p>Rainfall: {details.precip}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default DetailView;
