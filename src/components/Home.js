import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { checkWeather } from "../actions/ActionCreators";
const Home = ({ checkWeather }) => {
  let history = useHistory();
  const [city, setcity] = useState("");
  const handeChange = (e) => {
    setcity(e.target.value);
    console.log(city);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    checkWeather(city);
    console.log("Inside Handle Submit");
    history.push("/weather");
  };
  return (
    <div className="bg">
      <img src="Images/23284.jpg" alt="background-img" className="center" />
      <div className="search-container">
        <input
          type="text"
          className="search"
          onChange={handeChange}
          placeholder="Enter City Name.."
        />
        <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
          Search
        </button>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkWeather: (city) => dispatch(checkWeather(city))
  };
};
export default connect(null, mapDispatchToProps)(Home);
