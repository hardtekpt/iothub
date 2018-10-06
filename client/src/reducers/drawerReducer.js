import { SET_DRAWER_STATE } from "../actions/types";

const initialState = {
  open: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DRAWER_STATE:
      return {
        ...state,
        open: action.payload
      };
    default:
      return state;
  }
}
