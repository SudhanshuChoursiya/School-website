import { configureStore, combineReducers } from "@reduxjs/toolkit";

import alertReducer from "./alertSlice.js";

const rootReducer = combineReducers({
  alert: alertReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
