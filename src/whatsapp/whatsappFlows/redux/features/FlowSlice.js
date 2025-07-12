import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flowItems: {},
  screenName: {
    WELCOME: { screenName: "Welcome" },
  },
  canvasItems: [],
};

// const numberToWord = (num) => {
//   const ones = [
//     "one",
//     "two",
//     "three",
//     "four",
//     "five",
//     "six",
//     "seven",
//     "eight",
//     "nine",
//     "ten",
//     "eleven",
//     "twelve",
//     "thirteen",
//     "fourteen",
//     "fifteen",
//     "sixteen",
//     "seventeen",
//     "eighteen",
//     "nineteen",
//   ];
//   const tens = [
//     "",
//     "",
//     "twenty",
//     "thirty",
//     "forty",
//     "fifty",
//     "sixty",
//     "seventy",
//     "eighty",
//     "ninety",
//   ];

//   if (num < 20) return ones[num];
//   if (num < 100) {
//     const ten = Math.floor(num / 10);
//     const one = num % 10;
//     return one === 0 ? tens[ten] : `${tens[ten]}-${ones[one]}`;
//   }

//   return `option-${num}`;
// };

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
    addCanvasItems: (state, action) => {
      state.canvasItems.push(action.payload);
    },
    deleteFlowItem: (state, action) => {
      const { id } = action.payload;
      delete state.flowItems[id];
    },
    updateCanvasItem: (state, action) => {
      const { id, updates } = action.payload;

      const index = state.canvasItems.findIndex((item) => item.id === id);

      if (index !== -1) {
        state.canvasItems[index] = {
          ...state.canvasItems[index],
          ...updates,
        };
      }
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
  addCanvasItems,
  updateCanvasItem,
  deleteFlowItem,
  updateFlowItem,
  addScreenName,
  deleteScreen,
} = flowSlice.actions;
export default flowSlice.reducer;
