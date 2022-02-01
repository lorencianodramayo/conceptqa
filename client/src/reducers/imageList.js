import { createSlice } from "@reduxjs/toolkit";

export const imageListSlice = createSlice({
  name: "imageList",
  initialState: { value: [] },
  reducers: {
    imageList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { imageList } = imageListSlice.actions;

export default imageListSlice.reducer;
