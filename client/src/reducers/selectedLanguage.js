import { createSlice } from "@reduxjs/toolkit";

export const selectedLanguageSlice = createSlice({
  name: "selectedLanguage",
  initialState: { value: '' },
  reducers: {
    selectedLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectedLanguage } = selectedLanguageSlice.actions;

export default selectedLanguageSlice.reducer;
