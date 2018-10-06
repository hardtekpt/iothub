import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";

import { GET_ERRORS, SET_CURRENT_USER, GET_INFO } from "./types";

let socket;

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      const load = {
        user: decoded,
        socket: null
      };
      dispatch(setCurrentUser(load));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = data => {
  // Connect to socket.io
  socket = io.connect(
    "http://localhost:5000",
    {
      query: { token: localStorage.jwtToken }
    }
  );

  const load = {
    user: data.user,
    socket: socket
  };
  return {
    type: SET_CURRENT_USER,
    payload: load
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  const load = {
    user: {},
    socket: null
  };
  // Disconnect websocket
  socket.disconnect();
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser(load));
};

// Delete user account
export const deleteAccount = () => dispatch => {
  const load = {
    user: {},
    socket: null
  };
  axios
    .delete("/api/users")
    .then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: load
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Change pin
export const changePin = data => dispatch => {
  axios
    .post("/api/users/changepin", data)
    .then(res =>
      dispatch({
        type: GET_INFO,
        payload: { success: res.data.success }
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
