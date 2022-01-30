import { createSlice } from "@reduxjs/toolkit";

export const sidePanelSlice = createSlice({
  name: "sidePanel",
  initialState: { value: true },
  reducers: {
    sidePanel: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { sidePanel } = sidePanelSlice.actions;

export default sidePanelSlice.reducer;
