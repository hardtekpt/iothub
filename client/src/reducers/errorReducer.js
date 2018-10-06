import { GET_ERRORS, CLEAR_ERRORS, GET_INFO } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    case GET_INFO:
      return action.payload;
    default:
      return state;
  }
}
