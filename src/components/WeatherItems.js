import React from "react";

const WeatherItems = ({ name, val, iclass }) => {
  return (
    <div className="weather-items">
      <span>
        <i className={iclass}></i>
      </span>
      <h3>{name}</h3>
      <h1>
        <strong>{val}000</strong>
      </h1>
    </div>
  );
};

export default WeatherItems;
