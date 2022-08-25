import { combineReducers } from "redux";
// import postsReducer from "./postSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
