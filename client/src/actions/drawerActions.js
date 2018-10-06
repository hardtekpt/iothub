import { SET_DRAWER_STATE } from "./types";

// Delete user account
export const setDrawerState = state => dispatch => {
  dispatch({
    type: SET_DRAWER_STATE,
    payload: state
  });
};
