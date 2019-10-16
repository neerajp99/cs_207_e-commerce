import { GET_ITEMS, GET_ITEM_BY_ID } from "../actions/types";
import checkEmpty from "../validation/checkEmpty";

const initialState = {
  items: {},
  loading: false,
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case GET_ITEM_BY_ID:
      return {
        ...state,
        item: action.payload
      };

    default:
      return state;
  }
}
