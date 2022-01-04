import { createSlice } from "@reduxjs/toolkit";

const FastestFingersDataSlice = createSlice({
    name: 'FastestFingersData',
    initialState: {
        prefix: '',
        matchingArr: [],
    },
    reducers: {
        initializePrefix: (state,payload) => {
            state.prefix = payload.payload.pre;
        },
        initializeMatchingArr: (state,payload) => {
            state.matchingArr = payload.payload.matchingArr;
        }
    }
});

export default FastestFingersDataSlice.reducer;
export const {initializeMatchingArr, initializePrefix} = FastestFingersDataSlice.actions;