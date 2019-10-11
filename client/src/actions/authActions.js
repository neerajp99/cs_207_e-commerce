import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (data, history) => dispatch => {
  axios
    .post("/api/users/register", data)
    .then(res => {
      history.push("/login");
      console.log("hello");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

// Login User
export const loginUser = (data, history) => dispatch => {
  axios
    .post("/api/users/login", data)
    .then(res => {
      // Save the incoming data to local storage
      const { token } = res.data;
      // Set token to localstorage
      localStorage.setItem("jwtToken", token);
      // Set auth token to auth header
      setAuthToken(token);
      // Decode the access token to get user data
      const decodedToken = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

// Set Auth Token function
export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

// Logout User
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeIten("jwtToken");
  // Remove Auth headers from axios request
  setAuthToken(false);
  // Set current user to an empty object {} which will make isAuthenticated to false
  dispatch(setCurrentUser({}));
};
