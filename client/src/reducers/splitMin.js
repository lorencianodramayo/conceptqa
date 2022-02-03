import { createSlice } from "@reduxjs/toolkit";

export const splitMinSlice = createSlice({
  name: "splitMin",
  initialState: { value: { active: false, dynamic: {} } },
  reducers: {
    splitMin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { splitMin } = splitMinSlice.actions;

export default splitMinSlice.reducer;
