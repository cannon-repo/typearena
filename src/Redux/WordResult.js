import { createSlice } from "@reduxjs/toolkit";

const WordResultSlice = createSlice({
    name: 'WordResult',
    initialState: {
        correctWords: [],
        wrongWords: [],
        pts: 0,
    },
    reducers: {
        resetWordResult: (state) => {
            state.correctWords = [];
            state.wrongWords = [];
            state.pts = 0;
        },
        gotCorrect: (state,payload) => {
            state.pts += 20;
            state.correctWords.push(payload.payload.word);
        },
        gotWrong: (state,payload) => {
            state.pts = Math.max(0,state.pts-5);
            state.correctWords.push(payload.payload.word);
        }
    }
});

export default WordResultSlice.reducer;
export const { resetWordResult, gotCorrect, gotWrong } = WordResultSlice.actions;