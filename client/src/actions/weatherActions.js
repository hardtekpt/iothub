import axios from "axios";
import { GET_FORECAST, WEATHER_LOADING } from "./types";

// Delete user account
export const getForecast = () => dispatch => {
  dispatch(setWeatherLoading());
  axios
    .get("/api/weather")
    .then(res =>
      dispatch({
        type: GET_FORECAST,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Set loading state
export const setWeatherLoading = () => {
  return {
    type: WEATHER_LOADING
  };
};
