import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/Auth/AuthSlice';

export const store = configureStore({
    reducer: {
        auth,
    },
});