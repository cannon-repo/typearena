import { createSlice } from "@reduxjs/toolkit";

const SpeedTestSlice = createSlice({
    name: 'SpeedTestData',
    initialState: {
        para: [],
        ptr: 0,
        wrongCnt: 0,
    },
    reducers: {
        initPara: (state,payload) => {
            state.para = payload.payload.para;
            state.ptr = 0;
            state.wrongCnt = 0;
            state.para[0].isCurr = true;
        },
        gotCorrect: (state) => {
            state.para[state.ptr].cName = 'correct';
            state.ptr++;
        },
        gotWrong: (state) => {
            state.para[state.ptr].cName = 'wrong';
            state.ptr++;
        },
        backspace: (state) => {
            state.ptr--;
            state.para[state.ptr].cName = 'unvis';
        },
        incWrongCnt: (state) => {
            state.wrongCnt++;
        },
        decWrongCnt: (state) => {
            state.wrongCnt--;
        },
        markCurr: (state,payload) => {
            state.para[payload.payload.prv].isCurr = false;
            state.para[payload.payload.curr].isCurr = true;
        },
    }
});

export default SpeedTestSlice.reducer;
export const {initPara, gotCorrect, gotWrong, backspace, incWrongCnt, decWrongCnt, markCurr} = SpeedTestSlice.actions;