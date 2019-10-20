import { GET_CART_ITEMS } from "../actions/types";

const initialState = {
  cartItem: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItem: action.payload
      };
    default:
      return state;
  }
}
