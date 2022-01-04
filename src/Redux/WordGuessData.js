import { createSlice } from "@reduxjs/toolkit";

const WordGuessDataSlice = createSlice({
    name: 'WordGuessData',
    initialState: {
        completeWord: '',
        incompleteWord: '',
    },
    reducers: {
        initializeMatchObj: (state, payload) => {
            state.completeWord = payload.payload.completeWord;
            state.incompleteWord = payload.payload.incompleteWord;
        },
        clearMatchObj: (state) => {
            state.completeWord = '';
            state.incompleteWord = '';
        }
    }
});

export default WordGuessDataSlice.reducer;
export const { initializeMatchObj, clearMatchObj } = WordGuessDataSlice.actions;