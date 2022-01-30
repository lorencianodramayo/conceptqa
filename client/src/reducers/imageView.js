import { createSlice } from "@reduxjs/toolkit";

export const imageViewSlice = createSlice({
  name: "imageView",
  initialState: { value: false },
  reducers: {
    imageView: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { imageView } = imageViewSlice.actions;

export default imageViewSlice.reducer;
