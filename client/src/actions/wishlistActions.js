import { GET_ERRORS } from "./types";
import axios from "axios";

export const addToWishlist = (data, history) => dispatch => {
  axios
    .post("/api/wishlist", data)
    .then(res => {
      console.log("wishlist", res);
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};
