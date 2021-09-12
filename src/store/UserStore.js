import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import UserReducer from "../reducers/UserReducer";
import WeatherReducer from "../reducers/WeatherReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  user: UserReducer,
  weather: WeatherReducer
});
const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
export default configureStore;
