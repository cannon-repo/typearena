import {createSlice} from "@reduxjs/toolkit";

const NavViewSlice = createSlice({
    name: 'NavView',
    initialState: {viewClass: 'RemoveFromView'},
    reducers: {
        bringToView: (state) => {
            state.viewClass = 'BringToView'
        },
        removeFromView: (state) => {
            state.viewClass = 'RemoveFromView'
        },
    }
});

export const { bringToView, removeFromView } = NavViewSlice.actions;
export default NavViewSlice.reducer;