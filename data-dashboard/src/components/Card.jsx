import React from "react";

const Card = ({ data }) => {
  if (!data) {
    return <div className="card">No data available</div>;
  }

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
};

export default Card;
