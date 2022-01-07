import {configureStore} from "@reduxjs/toolkit";
import todoReducer from './todoSlice';

export default configureStore({
    reducer: {
        reducerTodos: todoReducer,
    }
});