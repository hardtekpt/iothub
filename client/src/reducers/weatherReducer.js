import { GET_FORECAST, WEATHER_LOADING } from "../actions/types";

const initialState = {
  weather: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WEATHER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FORECAST:
      return {
        ...state,
        weather: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
