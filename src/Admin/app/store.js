import { configureStore } from "@reduxjs/toolkit";
import modeReducer from '../redux/modeSlice'

export const store = configureStore({

    reducer:{
        mode: modeReducer
    }

});