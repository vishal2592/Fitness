import { createSlice } from "@reduxjs/toolkit";
const savedMode = localStorage.getItem("adminMode") || "gym";

const modeSlice = createSlice({
    name: "mode",
    initialState: {
        currentMode: savedMode
    },
    reducers: {
        setMode: (state, action) => {

            state.currentMode = action.payload;

            localStorage.setItem(
                "adminMode",
                action.payload
            );

        }
    }
});

export const {
    setMode
} = modeSlice.actions;

export default modeSlice.reducer;