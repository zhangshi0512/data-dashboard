import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DaytimeDurationChartCard = ({ data }) => {
  console.log("Data in DaytimeDurationChartCard: ", data);

  // Calculate daytime duration for each city
  const processedData = data.map((city) => {
    const sunriseTime = city.sunrise
      .split(":")
      .reduce((acc, time) => 60 * acc + +time);
    const sunsetTime = city.sunset
      .split(":")
      .reduce((acc, time) => 60 * acc + +time);
    return {
      ...city,
      daytimeDuration: parseFloat(
        Math.abs((sunsetTime - sunriseTime) / 60).toFixed(1)
      ), // duration in hours with one decimal place
    };
  });

  return (
    <div className="card">
      <h3>Daytime Duration by City</h3>
      {data ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="city_name"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="daytimeDuration" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available for chart.</p>
      )}
    </div>
  );
};

export default DaytimeDurationChartCard;
