import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import weatherReducer from "./weatherReducer";
import settingsReducer from "./settingsReducer";
import drawerReducer from "./drawerReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  weather: weatherReducer,
  settings: settingsReducer,
  drawer: drawerReducer
});
