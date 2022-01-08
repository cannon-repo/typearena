import { createSlice } from "@reduxjs/toolkit";

const WPMResultSlice = createSlice({
    name: 'WPMResult',
    initialState: {
        wpm: 0,
        acc: 0,
    },
    reducers: {
        initializeWPM: (state) => {
            state.wpm = 0;
            state.acc = 0;
        },
        setWPMnAcc: (state,payload) => {
            state.wpm = payload.payload.wpm;
            state.acc = payload.payload.acc;
        },
    }
});

export default WPMResultSlice.reducer;
export const {initializeWPM, setWPMnAcc} = WPMResultSlice.actions;