import {configureStore} from "@reduxjs/toolkit";
import todoReducerFromSlice from './todoSlice';

export default configureStore(
    {
        reducer: {
            reducerTodos: todoReducerFromSlice,
        }
    }
);