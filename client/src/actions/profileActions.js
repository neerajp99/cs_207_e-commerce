import { GET_ERRORS, CREATE_PROFILE } from "./types";
import axios from "axios";

// ********************* POST NEW/UPDATE PROFILE **********************
export const createProfile = (data, history) => dispatch => {
  axios
    .post("/api/profile", data)
    .then(res => {
      console.log("Profile Created: ", res);
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

// *************************** GET PROFILE ****************************
export const getProfile = () => dispatch => {
  axios
    .get("/api/profile")
    .then(res => {
      console.log("Profile Retrieved: ", res);
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};
