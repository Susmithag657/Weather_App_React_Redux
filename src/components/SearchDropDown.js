import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CitiesList from "./CitiesList";
import { checkWeather } from "../actions/ActionCreators";
const SearchDropDown = ({ cities, checkWeather }) => {
  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-warning dropdown-toggle "
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          City
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {cities.length > 0 &&
            cities.map((e, i) => (
              <CitiesList checkWeather={checkWeather} key={i} name={e} />
            ))}
          <li>
            <hr className="dropdown-divider"></hr>
          </li>
          <li>
            <Link className="dropdown-item" to="/home">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapSateToProps = (state) => {
  return {
    cities: state.weather.cities
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkWeather: (city) => dispatch(checkWeather(city))
  };
};
export default connect(mapSateToProps, mapDispatchToProps)(SearchDropDown);
