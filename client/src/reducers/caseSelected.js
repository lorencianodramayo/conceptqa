import { createSlice } from "@reduxjs/toolkit";

export const caseSelectedSlice = createSlice({
  name: "caseSelected",
  initialState: { value: 0 },
  reducers: {
    caseSelected: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { caseSelected } = caseSelectedSlice.actions;

export default caseSelectedSlice.reducer;
