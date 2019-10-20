import { ADD_TO_CART, GET_ERRORS, GET_CART_ITEMS } from "./types";
import axios from "axios";

export const addToCart = (data, history) => dispatch => {
  axios
    .post("/api/cart", data)
    .then(res => {
      console.log("cart", res);
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

// get cart items
export const getCartItems = () => dispatch => {
  axios
    .get("/api/cart")
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_CART_ITEMS,
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

// delete cartItem
export const deleteCart = id => dispatch => {
  axios
    .delete(`/api/cart/${id}`)
    .then(res => {
      console.log(res);
      window.location.reload();
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

// add to wishlist
export const cartToWishlist = id => dispatch => {
  axios
    .delete(`api/cart/moveToWishlist/${id}`)
    .then(res => {
      console.log(res);
      window.location.reload();
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};
