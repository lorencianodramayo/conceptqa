import { createSlice } from "@reduxjs/toolkit";

export const creativeStartedSlice = createSlice({
  name: "creativeStarted",
  initialState: { value: false },
  reducers: {
    creativeStarted: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { creativeStarted } = creativeStartedSlice.actions;

export default creativeStartedSlice.reducer;
