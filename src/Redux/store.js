import { configureStore } from "@reduxjs/toolkit";
import navViewReducer from "./NavViewSlice";
import TimerReducer from "./TimerSlice";
import WordResultReducer from "./WordResult";
import FastestFingersDataReducer from "./FastestFingersData";
import WordGuessData from "./WordGuessData";
import SpeedDataSlice from "./SpeedDataSlice";

const store = configureStore({
    reducer: {
        navView: navViewReducer,
        timer: TimerReducer,
        wordResult: WordResultReducer,
        ffdata: FastestFingersDataReducer,
        guessData: WordGuessData,
        speedData: SpeedDataSlice,
    }
});

export default store;