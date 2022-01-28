import { createSlice } from "@reduxjs/toolkit";

export const dynamicElementsSlice = createSlice({
  name: "dynamicElements",
  initialState: { value: {} },
  reducers: {
    dynamicElements: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { dynamicElements } = dynamicElementsSlice.actions;

export default dynamicElementsSlice.reducer;
