//import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/UserStore";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

const store = configureStore();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
