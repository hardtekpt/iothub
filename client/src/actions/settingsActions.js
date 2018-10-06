import axios from "axios";

import { GET_SETTINGS, GET_ERRORS, GET_INFO } from "./types";

// Get settings
export const getSettings = () => dispatch => {
  axios
    .get("/api/settings")
    .then(res =>
      dispatch({
        type: GET_SETTINGS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Add device
export const addDevice = newDevice => dispatch => {
  axios
    .post("/api/settings/device", newDevice)
    .then(res => {
      dispatch(getSettings());
      dispatch({
        type: GET_INFO,
        payload: { success: res.data.success }
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete device
export const removeDevice = id => dispatch => {
  axios
    .delete(`/api/settings/device/${id}`)
    .then(res => {
      dispatch(getSettings());
      dispatch({
        type: GET_INFO,
        payload: { success: res.data.success }
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
