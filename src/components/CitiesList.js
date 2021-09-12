import React from "react";
import { Link, useHistory } from "react-router-dom";
//import { connect } from "react-redux";

const CitiesList = (props) => {
  const history = useHistory();
  const handleClick = () => {
    if (props.name === "Home") {
      history.push("/home");
    } else {
      props.checkWeather(props.name);
    }
  };
  return (
    <li>
      <Link className="dropdown-item" to="#" onClick={handleClick}>
        {props.name}
      </Link>
    </li>
  );
};

export default CitiesList;
