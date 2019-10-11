import { GET_ITEM } from "../actions/types";
import checkEmpty from "../validation/checkEmpty";

const initialState = {
  item: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEM:
      return {
        ...state
      };
  }
}
