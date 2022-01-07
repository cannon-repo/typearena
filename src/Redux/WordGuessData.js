import { createSlice } from "@reduxjs/toolkit";

const WordGuessDataSlice = createSlice({
    name: 'WordGuessData',
    initialState: {
        completeWord: '',
        incompleteWord: '',
        highScoreWG: 0,
    },
    reducers: {
        initializeMatchObj: (state, payload) => {
            state.completeWord = payload.payload.completeWord;
            state.incompleteWord = payload.payload.incompleteWord;
        },
        clearMatchObj: (state) => {
            state.completeWord = '';
            state.incompleteWord = '';
        },
        setWGHighScore: (state,payload) => {
            state.highScoreWG = Math.max(state.highScoreWG,payload.payload.score);
        }
    }
});

export default WordGuessDataSlice.reducer;
export const { initializeMatchObj, clearMatchObj, setWGHighScore } = WordGuessDataSlice.actions;