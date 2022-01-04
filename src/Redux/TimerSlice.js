import { createSlice } from "@reduxjs/toolkit";

const TimerSlice = createSlice({
    name: 'Timer',
    initialState: {
        timeVal: 10,
        running: false,
    },
    reducers: {
        decTime: (state) => {
            state.timeVal--;
        },
        incTime: (state) => {
            state.timeVal++;
        },
        resetTime: (state) => {
            state.timeVal = 10;
            state.running = false;
        },
        startTimer: (state) => {
            state.running = true;
        },
        stopTimer: (state) => {
            state.running = false;
        }
    }
});

export default TimerSlice.reducer;
export const {decTime,incTime,resetTime,startTimer,stopTimer} = TimerSlice.actions;