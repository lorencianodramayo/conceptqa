import { createSlice } from "@reduxjs/toolkit";

export const creativeTimeSlice = createSlice({
  name: "creativeTime",
  initialState: { value: 0.0 },
  reducers: {
    creativeTime: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { creativeTime } = creativeTimeSlice.actions;

export default creativeTimeSlice.reducer;
