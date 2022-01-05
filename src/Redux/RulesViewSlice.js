import { createSlice } from "@reduxjs/toolkit";

const RulesViewSlice = createSlice({
    name: 'RulesView',
    initialState: {
        rulesView: false,
    },
    reducers: {
        toggleRuleView: (state) => {
            state.rulesView = !state.rulesView;
        }
    }
});

export default RulesViewSlice.reducer;
export const {toggleRuleView} = RulesViewSlice.actions;