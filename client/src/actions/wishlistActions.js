import { GET_ERRORS, GET_WISHLIST_ITEMS } from "./types";
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

// get wishlist items
export const getWishlistItems = () => dispatch => {
  axios
    .get("/api/wishlist")
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_WISHLIST_ITEMS,
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

// add wishlist to cart
export const moveToCart = id => dispatch => {
  axios
    .delete(`/api/wishlist/moveToCart/${id}`)
    .then(res => {
      console.log(res);
      window.location.reload()
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

// delete wishlist
export const deleteWishlist = id => dispatch => {
  axios
    .delete(`/api/wishlist/${id}`)
    .then(res => {
      console.log(res);
      window.location.reload()
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};
