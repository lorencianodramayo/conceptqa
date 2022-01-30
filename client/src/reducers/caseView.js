import { createSlice } from "@reduxjs/toolkit";

export const caseViewSlice = createSlice({
  name: "caseView",
  initialState: { value: 0 },
  reducers: {
    caseView: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { caseView } = caseViewSlice.actions;

export default caseViewSlice.reducer;
