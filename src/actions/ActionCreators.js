import * as Types from "./ActionTypes";
import UserApi from "../data/UserApi";
import WaetherAPi from "../data/WeatherApi";

export const setMessage = (message) => ({
  type: Types.SET_MESSAGE,
  payload: message
});
export const clearMessage = (message) => ({ type: Types.CLEAR_MESSAGE });

export function signUpSuccess(user) {
  return { type: Types.USER_SIGNUP_SUCCESS, payload: user };
}
export function signUpFail(error) {
  return { type: Types.USER_SIGNUP_FAIL, payload: error };
}

export function loginSuccess(user) {
  return { type: Types.USER_LOGIN_SUCCESS, payload: user };
}
export function loginFail(error) {
  return { type: Types.USER_LOGIN_FAIL, payload: error };
}
export function logOutUser() {
  return { type: Types.USER_LOGOUT };
}

export function checkEmail(email) {
  return { type: Types.CHECK_EMAIL, payload: email };
}

export function setWeather(data) {
  console.log("Inside setWeather...");
  return { type: Types.SET_WEATHERDATA, payload: data };
}

export function addUser(user) {
  return async function (dispatch, getState) {
    try {
      const response = await UserApi.register(user);
      console.log("Inside addUser action..");
      console.log(response[0]);
      dispatch(signUpSuccess(response[0]));
      dispatch(setMessage("Signup successfull"));
    } catch (error) {
      dispatch(signUpFail(error.toString()));
      dispatch(setMessage("Sign up Failed"));
    }
  };
}

export function loginUser(user) {
  return async function (dispatch, getState) {
    try {
      const response = await UserApi.login(user);
      console.log(response);
      if (response !== "user not found") {
        dispatch(loginSuccess(response));
        dispatch(setMessage("Login Success!"));
        return response;
      } else {
        dispatch(loginFail("login Failed!"));
      }
    } catch (error) {
      throw error;
    }
  };
}

export function validateEmail(email) {
  return async function (getState, dispatch) {
    try {
      const response = await UserApi.getUser(email);
      console.log(response);
      if (response.data.length) {
        dispatch(checkEmail(response.data));
      }
    } catch {
      console.log("Email already exists");
    }
  };
}

export function checkWeather(city) {
  return async function (getState, dispatch) {
    console.log("Inside CheckWeather");
    try {
      const response = await WaetherAPi.getWeather(city);
      if (response) {
        console.log("Dispatching setWeather...");
        dispatch(setWeather(response.data[0]));
      }
    } catch {
      console.log("Error");
    }
  };
}
