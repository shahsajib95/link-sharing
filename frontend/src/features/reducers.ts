import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import API from "@/store/services/api";

const rootReducer = combineReducers({
  auth: authReducer,

  [API.reducerPath]: API.reducer,
});

export default rootReducer;
