import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flowItems: {},
  screenName: {
    WELCOME: { screenName: "Welcome" },
  },
};

const flowSlice = createSlice({
  name: "flows",
  initialState,
  reducers: {
    addFlowItem: (state, action) => {
      const { id, data } = action.payload;
      state.flowItems[id] = data;
    },
    addScreenName: (state, action) => {
      const { id, data } = action.payload;
      state.screenName[id] = data;
    },
    deleteFlowItem: (state, action) => {
      const { id } = action.payload;
      delete state.flowItems[id];
    },
    deleteScreen: (state, action) => {
      const { id } = action.payload;
      delete state.screenName[id];
    },
    updateFlowItem: (state, action) => {
      const { id, data } = action.payload;
      if (state.flowItems[id]) {
        state.flowItems[id] = {
          ...state.flowItems[id],
          ...data,
        };
      } else {
        console.warn(`Flow item with id "${id}" does not exist`);
      }
    },
  },
});

export const {
  addFlowItem,
  deleteFlowItem,
  updateFlowItem,
  addScreenName,
  deleteScreen,
} = flowSlice.actions;
export default flowSlice.reducer;
