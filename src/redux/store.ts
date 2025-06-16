import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/Auth/AuthSlice';
import profile from '../features/UserProfile/UserProfileSlice';

export const store = configureStore({
    reducer: {
        auth,
        profile,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;