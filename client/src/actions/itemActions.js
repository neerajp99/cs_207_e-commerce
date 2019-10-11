import { GET_ITEM, GET_ERRORS } from "./types";
import axios from "axios";

// Post item
export const postItem = (data, history) => dispatch => {
  axios
    .post("/api/item/", data)
    .then(res => {
      history.push("/dashboard");
      console.log(res);
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};
