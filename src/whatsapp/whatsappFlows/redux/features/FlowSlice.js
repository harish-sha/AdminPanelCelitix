import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flowItems: {},
};

const flowSlice = createSlice({
  name: "flows",
  initialState,
  reducers: {
    addFlowItem: (state, action) => {
      console.log("action.payload addedflowitem", action.payload);
      const { id, data } = action.payload;
      state.flowItems[id] = data;
    },
    deleteFlowItem: (state, action) => {
      const { type } = action.payload;
      console.log("action.payload deleteflowitem", action.payload)
      delete state.flowItems[type];
    },
  },
});

export const { addFlowItem, deleteFlowItem } = flowSlice.actions;
export default flowSlice.reducer;
