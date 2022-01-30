import { createSlice } from '@reduxjs/toolkit';

export const templateSlice = createSlice({
    name: "template",
    initialState: { value: {}},
    reducers: {
        template: (state, action) => {
            state.value = action.payload
        }
    },
});

export const { template } = templateSlice.actions;

export default templateSlice.reducer;