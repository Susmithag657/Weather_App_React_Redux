import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Weather from "./components/Weather";
import PrivateRoute from "./components/PrivateRoute";
import { connect } from "react-redux";
export function App({ isLoggedIn }) {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute
            exact
            path="/home"
            isLoggedIn={isLoggedIn}
            component={Home}
          />
          <Route path="/signUp" component={SignUp} />
          <Route path="/signIn" component={SignIn} />
          <PrivateRoute
            exact
            path="/weather"
            isLoggedIn={isLoggedIn}
            component={Weather}
          />
          <Route exact path="/" component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};
export default connect(mapStateToProps, null)(App);
