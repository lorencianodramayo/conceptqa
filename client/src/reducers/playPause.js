import { createSlice } from "@reduxjs/toolkit";

export const playPauseSlice = createSlice({
  name: "playPause",
  initialState: { value: true },
  reducers: {
    playPause: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { playPause } = playPauseSlice.actions;

export default playPauseSlice.reducer;
