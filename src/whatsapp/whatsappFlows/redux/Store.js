import { configureStore } from "@reduxjs/toolkit";
import flowReducer from "./features/FlowSlice";

const store = configureStore({
  reducer: {
    flows: flowReducer,
  },
});

export default store;
