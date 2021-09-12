import * as Types from "../actions/ActionTypes";
import _ from "lodash";

const initialState = {
  data: "",
  cities: ["Home", "Hyderabad", "Vizag"]
};

const WeatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_WEATHERDATA: {
      console.log("Inside reducer...");
      console.log(action.payload);
      const newData = _.cloneDeep(action.payload);
      return {
        ...state,
        data: newData,
        cities: [...new Set(...state.cities, action.payload.city_name)]
      };
    }
    default: {
      console.log("inside default switch");
      return state;
    }
  }
};

export default WeatherReducer;
