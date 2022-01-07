import { createSlice } from "@reduxjs/toolkit";

const FastestFingersDataSlice = createSlice({
    name: 'FastestFingersData',
    initialState: {
        prefix: '',
        matchingArr: [],
        highScoreFF: 0,
    },
    reducers: {
        initializePrefix: (state,payload) => {
            state.prefix = payload.payload.pre;
        },
        initializeMatchingArr: (state,payload) => {
            state.matchingArr = payload.payload.matchingArr;
        },
        setHighScoreFF: (state,payload) => {
            state.highScoreFF = Math.max(state.highScoreFF,payload.payload.score);
        },
    }
});

export default FastestFingersDataSlice.reducer;
export const {initializeMatchingArr, initializePrefix, setHighScoreFF} = FastestFingersDataSlice.actions;