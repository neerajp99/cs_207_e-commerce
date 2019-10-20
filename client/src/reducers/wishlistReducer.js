import { GET_WISHLIST_ITEMS} from "../actions/types";

const initialState = {
  wishlistItem: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST_ITEMS:
      return {
        ...state,
        wishlistItem: action.payload
      };
    default:
      return state;
  }
}
