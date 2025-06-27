import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flowItems: [],
};

const flowSlice = createSlice({
  name: "flows",
  initialState,
  reducers: {
    addFlowItem: (state, action) => {
      console.log("state", state);
      console.log("action", action)
      const { data } = action.payload;
      state.flowItems = data;
    },
    deleteFlowItem: (state, action) => {
      const { type } = action.payload;
      delete state.flowItems[type];
    },
  },
});

export const { addFlowItem, deleteFlowItem } = flowSlice.actions;
export default flowSlice.reducer;
