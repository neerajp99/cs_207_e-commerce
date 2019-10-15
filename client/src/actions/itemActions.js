import { GET_ITEMS, GET_ERRORS } from "./types";
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

// Get Item
export const getItems = () => dispatch => {
  axios
    .get("/api/item")
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};
