import { GET_ERRORS, CREATE_PROFILE } from "../actions/types";
import checkEmpty from "../validation/checkEmpty";

const initialState = {
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROFILE:
      return {
        ...state,
        profile: action.payload
      };

    default:
      return state;
  }
}
