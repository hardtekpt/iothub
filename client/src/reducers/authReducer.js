import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  socket: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload.user),
        user: action.payload.user,
        socket: isEmpty(action.payload.user) ? null : action.payload.socket
      };
    default:
      return state;
  }
}
