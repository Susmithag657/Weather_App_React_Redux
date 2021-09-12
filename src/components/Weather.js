import React from "react";
import { connect } from "react-redux";
import SearchDropDown from "./SearchDropDown";
import { checkWeather } from "../actions/ActionCreators";
import WeatherItems from "./WeatherItems";
const Weather = ({ weather, cities, checkWeather }) => {
  return (
    <div className="div-container">
      <img className="center" src="Images/landscape.jpg" alt="background-img" />
      <SearchDropDown
        cities={cities}
        checkWeather={checkWeather}
        className="search-dropdown"
      />
      <div className="d-flex flex-container blur">
        <div className="weather-items">
          <h1>
            <strong>Temp</strong>
          </h1>
          <h5>Temp feels like temp</h5>
        </div>
        <div className="d-flex flex-grow-1">
          <WeatherItems name="Rain" val={weather} iclass="bi bi-cloud-rain" />
          <WeatherItems name="Wind" val={weather} iclass="bi bi-wind" />
          <WeatherItems name="Humidity" val={weather} iclass="bi bi-droplet" />
          <WeatherItems
            name="UV Index"
            val={weather}
            iclass="bi bi-brightness-high"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    weather: state.weather.data,
    cities: state.weather.cities
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkWeather: (city) => dispatch(checkWeather(city))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
