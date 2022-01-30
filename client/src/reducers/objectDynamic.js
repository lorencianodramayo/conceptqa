import { createSlice } from "@reduxjs/toolkit";

export const objectDynamicSlice = createSlice({
  name: "objectDynamic",
  initialState: { value: {} },
  reducers: {
    objectDynamic: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { objectDynamic } = objectDynamicSlice.actions;

export default objectDynamicSlice.reducer;
